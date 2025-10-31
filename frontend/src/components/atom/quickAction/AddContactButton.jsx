import { useModal } from "../../../hooks/contextHooks/useModelHook.js";
import { AddContactModalContent } from "../../organisms/quickActionContent/AddContactModalContent";
import { motion } from "framer-motion";

const AddContactButton = ({ name, icon:Icon }) => {
  const { openModal, closeModal } = useModal();
  const handleOpenSettings = () => {
    openModal(<AddContactModalContent onClose={closeModal} />);
  };
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleOpenSettings}
      className="flex items-center gap-3 p-3 rounded-lg bg-[#111214] border border-white/5 hover:border-slate-600/40 transition cursor-pointer"
    >
   <Icon className="w-5 h-5 text-slate-200" />

      <div className="text-sm text-slate-100">{name}</div>
    </motion.button>
  );
};
export default AddContactButton;
