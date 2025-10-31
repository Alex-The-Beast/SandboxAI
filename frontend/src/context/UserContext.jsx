import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkAuthRequest,getProfileRequest } from "../api/auth";


export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", image: "" ,id:""});
  const [loadingProfile, setLoadingProfile] = useState(true);
const[isProfileUpdated,setIsProfileUpdated]=useState(false);

useEffect(()=>{
      const fetchProfile = async () => {
      try {
        const res = await getProfileRequest();
        console.log("from profile"+res);
        if (res?.success) {
          setProfile({ name: res.name, image: res.image ,id:res.id});
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.log(error);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
},[isProfileUpdated])
 
    
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkAuthRequest();
        console.log(data);
        if (data?.user) {
      if (data?.user) setUser({ walletAddress: data.user });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading ,profile,loadingProfile,isProfileUpdated,setIsProfileUpdated}}>
      {children}
    </UserContext.Provider>
  );
};
