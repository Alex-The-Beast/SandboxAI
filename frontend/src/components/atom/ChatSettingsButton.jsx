import { useModal } from "../../hooks/contextHooks/useModelHook.js";
import SettingsModalContent from "../organisms/SettingsModelContent";

const ChatSettingsButton = ({ icon }) => {
  const { openModal,closeModal } = useModal();

  const handleOpenSettings = () => {
    openModal(<SettingsModalContent  onClose={closeModal}/>);
  };
  return (
    <button onClick={handleOpenSettings} className="cursor-pointer">
      {icon}
    </button>
  );
};

export default ChatSettingsButton;
