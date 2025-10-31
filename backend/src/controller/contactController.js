import Contact from "../schema/contact.js";

export const addContacts = async (req, res) => {
  try {
    console.log(req.user);
    const ownerWallet = req.user.walletAddress;
    console.log(req.body);
    const { walletAddress, name } = req.body;
    if (!name || !walletAddress)
      return res
        .status(400)
        .json({ error: "Name and wallet address are required" });
    const newContact = await Contact.create({
      ownerWallet,
      name,
      walletAddress,
    });
    res
      .status(201)
      .json({ message: "contact added successfully", contact: newContact });
  } catch (error) {
    console.log("Error in add contact controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    console.log(req.user);
    const ownerWallet = req.user.walletAddress;
    if (!ownerWallet) {
      return res.status(400).json({ error: "Invalid user session" });
    }

    const allContacts = await Contact.find({ ownerWallet }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      count: allContacts.length,
      contacts: allContacts,
    });
  } catch (error) {
    console.log("Error in get all contact controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// further we will add get contact by name  or by address
//delete contact by name or by address
//update contact by name or address
