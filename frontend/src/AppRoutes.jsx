// // src/AppRoutes.jsx
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// import { UserProvider } from "./context/UserContext";
// import PrivateRoute from "./components/organisms/PrivateRoute";
// import Dashboard from "./pages/Dashboard";
// import Chat from "./pages/Chat";
// import { ModalProvider } from "./context/ModelContext";
// import { WalletProvider } from "./context/WalletContext";
// import { useContext } from "react";
// import { UserContext } from "./context/UserContext";

// const AppRoutes = () => {
//   const { user } = useContext(UserContext);
//   return (
//     <WalletProvider walletAddress={user?.walletAddress}>
//       <ModalProvider>
//         <UserProvider>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/chat"
//               element={
//                 <PrivateRoute>
//                   <Chat />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </UserProvider>
//       </ModalProvider>
//     </WalletProvider>
//   );
// };

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Swap from "./pages/Swap";

import { UserProvider, UserContext } from "./context/UserContext";
import PrivateRoute from "./components/organisms/PrivateRoute";
import { ModalProvider } from "./context/ModelContext";
import { WalletProvider } from "./context/WalletContext";
import { useContext } from "react";

function InnerRoutes() {
  const { user, loading } = useContext(UserContext);

  // Wait until user is loaded
  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <WalletProvider walletAddress={user?.walletAddress}>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:sessionId"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/swap"
            element={
              <PrivateRoute>
                <Swap />
              </PrivateRoute>
            }
          />
        </Routes>
      </ModalProvider>
    </WalletProvider>
  );
}

const AppRoutes = () => {
  return (
    <UserProvider>
      <InnerRoutes />
    </UserProvider>
  );
};

export default AppRoutes;
