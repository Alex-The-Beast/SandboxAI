import { jupAxios } from "../../config/jupConfig.js";



export const getOrder = async ({ inputMint, outputMint, amount, taker }) => {
  try {
    const response = await jupAxios.get("/ultra/v1/order", {
      params: {
        inputMint,
        outputMint,
        amount,
        taker,
      },
    });
    console.log(response.data.requestId)
    return response.data;
    
  } catch (error) {
    console.log(error, "Error in get order");
  }
};

export const tokenList = async (limit = 30) => {
  try {
    const response = await jupAxios.get("/tokens/v2/toptraded/24h", {
      params: { limit },
    });
    return response.data.tokens || response.data;
  } catch (error) {
    console.error("Error fetching top tokens:", error);
    return [];
  }
};

export const searchToken = async (query) => {
  try {
    console.log(query);
    if (!query || query.trim().length === 0) return [];
    const response = await jupAxios.get("/tokens/v2/search", {
      params: {
        query: query.trim(),
      },
    });
    return response.data || [];
  } catch (error) {
    console.log("Error in search token");
    return [];
  }
};


export const executeOrder = async ({ signedTransaction, requestId }) => {
  try {
    const response = await jupAxios.post("/ultra/v1/execute", {
      signedTransaction,
      requestId,
    });
    return response.data;
  } catch (error) {
    console.log(error, "Error in execute order");
  }
};


