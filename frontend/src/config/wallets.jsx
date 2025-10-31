// config/wallets.js
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";

export const wallets = [
  new PhantomWalletAdapter(),
  new BackpackWalletAdapter(),
  new TorusWalletAdapter(),
  new SolflareWalletAdapter(),
];
