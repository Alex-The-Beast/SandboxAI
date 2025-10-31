import { toast } from "react-toastify";
import axios from "../../config/axiosConfig.js";
export const getSolBalance = async ({walletAddress}) => {
  try {
    console.log(walletAddress+"from get sol balance api ");
    const bal = await axios.get(`/web3/getSolBalance/${walletAddress}`);
    return bal;
  } catch (error) {
    toast.error("Failed to fetch SOL balance.", {
      position: "bottom-right",
      autoClose: 3000,
    })
    console.log(error, "Error in get sol balance hii ");
  }
};

