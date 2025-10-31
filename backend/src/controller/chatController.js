import Agent from "../schema/agent.js";
import Channel from "../schema/channel.js";
import Message from "../schema/message.js";
import { contactAgent } from "../agents/agents.js";
import { HumanMessage } from "@langchain/core/messages";

export const sendMessageController = async (req, res) => {
  const { userId, message, channelId } = req.body;
  console.log("from agent tool", req.user);
  const walletAddress = req.user.walletAddress;

  try {
    const agent = await Agent.findOne({ userId });
    if (!agent) return res.status(400).json({ error: "Agent not found" });
    let session;
    if (!channelId) {
      session = await Channel.create({
        userId,
        ownerWallet: agent.walletAddress,
        agentId: agent._id,
        name: message.charAt(0).toUpperCase() + message.slice(1),
      });
    } else {
      session = await Channel.findById(channelId);
      if (!session) return res.status(400).json({ error: "Channel not found" });
      //   session.lastMessage = body;
      await session.save();
    }

    await Message.create({
      body: message,
      channelId: session._id,
      sender: "user",
    });

    const aiResponse = await contactAgent.invoke(
      {
        messages: [new HumanMessage(message)],
      },
      {
        configurable: {
          thread_id: session._id.toString(),
          walletAddress: walletAddress,
          userId: userId, // Use session ID for conversation memory
        },
      }
    );

    // ✅ FIXED: Extract response correctly from ReAct agent
    const reply =
      aiResponse.messages[aiResponse.messages.length - 1].content ||
      "Sorry, I couldn't process that.";

    console.log("aiResponse", aiResponse);
    const messages = aiResponse.messages || [];
    let unsignedTx = null;

    // Find the last ToolMessage for "send_sol_prepare"
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.name === "send_sol_prepare" && msg.content) {
        try {
          const parsed = JSON.parse(msg.content);
          if (parsed.unsignedBase64) {
            unsignedTx = parsed;
            break;
          }
        } catch (e) {
          console.error("Failed to parse tool message content:", e);
        }
      }
    }
    await Message.create({
      body: reply,
      channelId: session._id,
      sender: "bot",
    });
    res.json({
      success: true,
      channelId: session._id,
      message: [
        {
          body: reply,
          sender: "bot",
        },
      
      ],
        unsignedTx,
    });
  } catch (error) {
    console.log("error in send message controller", error);
  }
};

export const getChannelByIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const channel = await Channel.findOne({ userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      channel,
    });
  } catch (error) {
    console.log("error in get channel by id controller", error);
  }
};
export const getMessagesByChannelIdController = async (req, res) => {
  try {
    const { channelId } = req.params;
    const messages = await Message.find({ channelId }).sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllChannelController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch only channels belonging to the current user
    const channels = await Channel.find({ userId })
      .sort({ updatedAt: -1 })
      .populate("agentId", "name") // optional — to show agent name in UI
      .select("name lastMessage createdAt updatedAt agentId"); // optimize response

    res.json({ success: true, channels });
  } catch (error) {
    console.error("Error fetching user channels:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
