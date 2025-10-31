
import axios from "../../config/axiosConfig.js"



export const sendRequest = async (data) => {
  try {
    const res = await axios.post('/solana/sendRequest', data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data?.unsignedTx) {
      return res.data;
    } else {
      throw new Error(res.data?.message || "Failed to get unsigned transaction");
    }
  } catch (err) {
    console.error("❌ sendRequest error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "Error creating unsigned transaction"
    );
  }
};


export const verifyTransaction = async (data) => {
  try {
    const res = await axios.post('/solana/verifyTransaction', data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data?.success) {
      return res.data;
    } else {
      throw new Error(res.data?.message || "Transaction verification failed");
    }
  } catch (err) {
    console.error("❌ verifyTransaction error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "Error verifying transaction"
    );
  }
};
