// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import {  WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import "@solana/wallet-adapter-react-ui/styles.css";
// import { wallets } from "../config/wallets";

// const Adapter = ({ children }) => {
//   return (
//     <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/DLxc8Y4rL9WqiNaU4JsCS">
//       <WalletProvider wallets={wallets} autoConnect={false}>
//         <WalletModalProvider>{children}</WalletModalProvider>
  
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

// export default Adapter;


import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { wallets as configuredWallets } from "../config/wallets";

const Adapter = ({ children }) => {
  // ✅ Memoize the wallets so the reference doesn’t change on re-render
  const wallets = useMemo(() => configuredWallets, []);

  // ✅ Optionally memoize the endpoint too
  const endpoint = useMemo(
    () => import.meta.env.VITE_ALCHEMY_URL,
    
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Adapter;
