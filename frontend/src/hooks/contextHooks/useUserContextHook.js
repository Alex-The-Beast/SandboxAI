import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
export const useUserContextHook=()=>useContext(UserContext)