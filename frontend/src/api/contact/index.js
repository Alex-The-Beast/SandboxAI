import axios from "../../config/axiosConfig.js";
export const getAllContacts = async () => {
  try {
    const response = await axios.get("/contact/get");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error, "Error in get all contact controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const addContacts = async (name, walletAddress) => {
  try {
    const response = await axios.post("/contact/add", { name, walletAddress });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error, "Error in add contact controller frontend");
  }
};
