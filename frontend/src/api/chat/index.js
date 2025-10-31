import  axios  from "../../config/axiosConfig.js";
export const sendMessage = async (message, userId, channelId) => {
  try {
    const res = await axios.post("/chat/message", {
      message,
      userId,
      channelId,
    });
    console.log(res+"from jsx lol alex");
    return res.data;
  } catch (error) {
    console.log(error, "Error in send message");
  }
};
export const getAllChannel=async()=>{
  try {
    const res = await axios.get("/chat/channel",{withCredentials:true});
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error, "Error in get all channel");
  }
}
export const getChannelById=async(channelId)=>{
  try {
    const res = await axios.get(`/chat/channel/${channelId}`,{withCredentials:true});
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error, "Error in get channel by id");
  }
}
export const getMessagesByChannelId=async(channelId)=>{
  try {
    const res = await axios.get(`/chat/messages/${channelId}`,{withCredentials:true});
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error, "Error in get messages by channel id");
  }
}