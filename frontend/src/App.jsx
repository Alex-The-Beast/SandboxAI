import AppRoutes from "./APPRoutes.jsx";
import Adapter from "./web3/Adapter.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Adapter>
        <AppRoutes />
        <ToastContainer />
      </Adapter>
    </QueryClientProvider>
  );
};
export default App;
