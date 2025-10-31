import { useContext } from "react";
import { ModelContext } from "../../context/ModelContext"; // named import
export const useModal = () => useContext(ModelContext);