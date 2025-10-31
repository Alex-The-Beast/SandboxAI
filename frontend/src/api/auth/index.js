import axios from "../../config/axiosConfig.js";

export const createNonceRequest = async ({ walletAddress }) => {
  try {
    const response = await axios.post("/login", { walletAddress });
    console.log(response.data + "from createnonce");
    return response.data;
  } catch (error) {
    console.log(error, "Error in create nonce request");
   
  }
};
export const verifySignatureRequest = async ({ walletAddress, signature }) => {
  try {
    const response = await axios.post("/verify", { walletAddress, signature });
    console.log(response.data + "from verifysignature");
    return response.data;
  } catch (error) {
    console.log(error, "Error in verify signature request");
    
  }
};

export const checkAuthRequest=async()=>{
    try{
        const response=await axios.get('/me',{withCredentials:true})
        return response.data

    }catch(error){
        console.log(error, "Error in check auth request");
      
    }
}
export const logoutRequest=async()=>{
    try{
        const response=await axios.post('/logout',{},{withCredentials:true})
        return response.data

    }catch(error){
        console.log(error, "Error in logout request");
      
    }
}
export const updateRequest=async({name,image})=>{
    try{
        const response=await axios.patch('/update',{name,image},{withCredentials:true})
        return response.data

    }catch(error){
        console.log(error, "Error in update request");
      
    }
}

export const getProfileRequest=async()=>{
    try{
        const response=await axios.get('/profile',{withCredentials:true})
        return response.data

    }catch(error){
        console.log(error, "Error in get profile request");
      
    }
}