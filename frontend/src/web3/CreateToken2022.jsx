// // import React, { useState } from "react";
// // import { useWallet } from "@solana/wallet-adapter-react";
// // import {
// //   SystemProgram,
// //   Transaction,
// //   Keypair,
// //   sendAndConfirmTransaction,
// // } from "@solana/web3.js";
// // import {
// //   TOKEN_2022_PROGRAM_ID,
// //   getMintLen,
// //   ExtensionType,
// //   createInitializeMintInstruction,
// //   createInitializeMetadataPointerInstruction,
// //   createUpdateMetadataInstruction,
// //   getOrCreateAssociatedTokenAccount,
// //   mintTo,
// // } from "@solana/spl-token";
// // import { connection } from "../config/rpcConfig.js";

// // const CreateToken2022 = () => {

// //   const { publicKey, signTransaction } = useWallet();
// //   const [mintAddress, setMintAddress] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const createToken = async () => {
// //     try {
// //       if (!publicKey || !signTransaction) {
// //         alert("Please connect your wallet first!");
// //         return;
// //       }

// //       setLoading(true);

// //       // STEP 1 — Create Mint Account
// //       const mintKeypair = Keypair.generate();
// //       const mintLen = getMintLen([ExtensionType.MetadataPointer]);
// //       const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

// //       const createMintIx = SystemProgram.createAccount({
// //         fromPubkey: publicKey,
// //         newAccountPubkey: mintKeypair.publicKey,
// //         space: mintLen,
// //         lamports,
// //         programId: TOKEN_2022_PROGRAM_ID,
// //       });

// //       // STEP 2 — Initialize Metadata Pointer Extension
// //       const initMetadataIx = createInitializeMetadataPointerInstruction(
// //         mintKeypair.publicKey,
// //         publicKey,
// //         mintKeypair.publicKey,
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       // STEP 3 — Initialize Mint
// //       const initMintIx = createInitializeMintInstruction(
// //         mintKeypair.publicKey,
// //         9, // decimals
// //         publicKey,
// //         publicKey,
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       // Combine all instructions
// //       const tx = new Transaction().add(createMintIx, initMetadataIx, initMintIx);

// //       // User signs & sends transaction
// //       tx.feePayer = publicKey;
// //       tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
// //       tx.partialSign(mintKeypair);
// //       const signedTx = await signTransaction(tx);
// //       const txSig = await connection.sendRawTransaction(signedTx.serialize());
// //       await connection.confirmTransaction(txSig, "confirmed");

// //       console.log("✅ Mint Created:", mintKeypair.publicKey.toBase58());

// //       // STEP 4 — Add Metadata
// //       const metadata = {
// //         updateAuthority: publicKey,
// //         mint: mintKeypair.publicKey,
// //         name: "K9Beast",
// //         symbol: "K9",
// //         uri: "https://example.com/metadata.json",
// //       };

// //       const metadataIx = createUpdateMetadataInstruction(
// //         metadata,
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       const metadataTx = new Transaction().add(metadataIx);
// //       metadataTx.feePayer = publicKey;
// //       metadataTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

// //       const signedMetaTx = await signTransaction(metadataTx);
// //       const metaSig = await connection.sendRawTransaction(signedMetaTx.serialize());
// //       await connection.confirmTransaction(metaSig, "confirmed");

// //       console.log("✅ Metadata Added");

// //       // STEP 5 — Create Associated Token Account for user
// //       const ata = await getOrCreateAssociatedTokenAccount(
// //         connection,
// //         Keypair.generate(), // temporary payer (not used)
// //         mintKeypair.publicKey,
// //         publicKey,
// //         false,
// //         "confirmed",
// //         { skipPreflight: false },
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       console.log("✅ ATA:", ata.address.toBase58());

// //       // STEP 6 — Mint Tokens
// //       const mintTxSig = await mintTo(
// //         connection,
// //         Keypair.generate(), // dummy payer, only wallet authority matters
// //         mintKeypair.publicKey,
// //         ata.address,
// //         publicKey,
// //         1_000_000_000n, // 1,000 tokens
// //         [],
// //         undefined,
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       console.log("✅ Minted Tokens:", mintTxSig);
// //       setMintAddress(mintKeypair.publicKey.toBase58());
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("❌ Error:", err);
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <button
// //         onClick={createToken}
// //         disabled={loading}
// //         className="px-4 py-2 bg-purple-600 text-white rounded-lg"
// //       >
// //         {loading ? "Creating..." : "Create Token 2022"}
// //       </button>

// //       {mintAddress && (
// //         <p className="mt-3 text-green-400">
// //           ✅ Mint Address: {mintAddress} <br />
// //           <a
// //             href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
// //             target="_blank"
// //             rel="noreferrer"
// //             className="underline text-blue-400"
// //           >
// //             View on Solana Explorer
// //           </a>
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CreateToken2022;

// // import React, { useState } from "react";
// // import { useWallet } from "@solana/wallet-adapter-react";
// // import {
// //   SystemProgram,
// //   Transaction,
// //   Keypair,
// //   sendAndConfirmTransaction,
// //   TransactionInstruction,
// //   PublicKey,
// // } from "@solana/web3.js";
// // import {
// //   TOKEN_2022_PROGRAM_ID,
// //   getMintLen,
// //   ExtensionType,
// //   createInitializeMintInstruction,
// //   createInitializeMetadataPointerInstruction,
// //   getOrCreateAssociatedTokenAccount,
// //   mintTo,
// // } from "@solana/spl-token";
// // import { connection } from "../config/rpcConfig.js";

// // const encodeStringToBytes = (str, length) => {
// //   const buffer = Buffer.alloc(length, 0);
// //   buffer.write(str);
// //   return buffer;
// // };

// // const CreateToken2022 = () => {
// //   const { publicKey, signTransaction } = useWallet();
// //   const [mintAddress, setMintAddress] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const createToken = async () => {
// //     try {
// //       if (!publicKey || !signTransaction) {
// //         alert("Please connect your wallet first!");
// //         return;
// //       }

// //       setLoading(true);

// //       // STEP 1 — Create Mint Account
// //       const mintKeypair = Keypair.generate();
// //       const mintLen = getMintLen([ExtensionType.MetadataPointer]);
// //       const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

// //       const createMintIx = SystemProgram.createAccount({
// //         fromPubkey: publicKey,
// //         newAccountPubkey: mintKeypair.publicKey,
// //         space: mintLen,
// //         lamports,
// //         programId: TOKEN_2022_PROGRAM_ID,
// //       });

// //       // STEP 2 — Initialize MetadataPointer Extension
// //       const initMetadataIx = createInitializeMetadataPointerInstruction(
// //         mintKeypair.publicKey,
// //         publicKey,
// //         mintKeypair.publicKey,
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       // STEP 3 — Initialize Mint with TokenMetadata Extension
// //       const initMintIx = createInitializeMintInstruction(
// //         mintKeypair.publicKey,
// //         9, // decimals
// //         publicKey, // mint authority
// //         publicKey, // freeze authority
// //         TOKEN_2022_PROGRAM_ID
// //       );

// //       // Combine instructions
// //       const tx = new Transaction().add(createMintIx, initMetadataIx, initMintIx);

// //       // Sign & send transaction
// //       tx.feePayer = publicKey;
// //       tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
// //       tx.partialSign(mintKeypair);

// //       const signedTx = await signTransaction(tx);
// //       const txSig = await connection.sendRawTransaction(signedTx.serialize());
// //       await connection.confirmTransaction(txSig, "confirmed");
// //       console.log("✅ Mint Created:", mintKeypair.publicKey.toBase58());

// //       // STEP 4 — Write Metadata (TokenMetadata Extension)
// //       const nameBytes = encodeStringToBytes("K9B1east", 32);
// //       const symbolBytes = encodeStringToBytes("K19", 10);
// //       const uriBytes = encodeStringToBytes("https://example.com/metadata.json", 200);

// //       // Metadata layout: [name(32) | symbol(10) | uri(200)]
// //       const metadataData = Buffer.concat([nameBytes, symbolBytes, uriBytes]);

// //       const metadataIx = new TransactionInstruction({
// //         programId: TOKEN_2022_PROGRAM_ID,
// //         keys: [
// //           { pubkey: mintKeypair.publicKey, isSigner: false, isWritable: true },
// //           { pubkey: publicKey, isSigner: true, isWritable: false }, // update authority
// //         ],
// //         data: metadataData, // your encoded name/symbol/uri
// //       });

// //       const metadataTx = new Transaction().add(metadataIx);
// //       metadataTx.feePayer = publicKey;
// //       metadataTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

// //       const signedMetadataTx = await signTransaction(metadataTx);
// //       const metaSig = await connection.sendRawTransaction(signedMetadataTx.serialize());
// //       await connection.confirmTransaction(metaSig, "confirmed");
// //       console.log("✅ Metadata Added");

// //       // STEP 5 — Create Associated Token Account
// //       const ata = await getOrCreateAssociatedTokenAccount(
// //         connection,
// //         Keypair.generate(), // temporary payer
// //         mintKeypair.publicKey,
// //         publicKey,
// //         false,
// //         "confirmed",
// //         { skipPreflight: false },
// //         TOKEN_2022_PROGRAM_ID
// //       );
// //       console.log("✅ ATA:", ata.address.toBase58());

// //       // STEP 6 — Mint Tokens
// //       const mintTxSig = await mintTo(
// //         connection,
// //         Keypair.generate(), // dummy payer
// //         mintKeypair.publicKey,
// //         ata.address,
// //         publicKey,
// //         1_000_000_000n, // 1,000 tokens with 9 decimals
// //         [],
// //         undefined,
// //         TOKEN_2022_PROGRAM_ID
// //       );
// //       console.log("✅ Minted Tokens:", mintTxSig);

// //       setMintAddress(mintKeypair.publicKey.toBase58());
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("❌ Error:", err);
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <button
// //         onClick={createToken}
// //         disabled={loading}
// //         className="px-4 py-2 bg-purple-600 text-white rounded-lg"
// //       >
// //         {loading ? "Creating..." : "Create Token 2022"}
// //       </button>

// //       {mintAddress && (
// //         <p className="mt-3 text-green-400">
// //           ✅ Mint Address: {mintAddress} <br />
// //           <a
// //             href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
// //             target="_blank"
// //             rel="noreferrer"
// //             className="underline text-blue-400"
// //           >
// //             View on Solana Explorer
// //           </a>
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CreateToken2022;


// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import {
//   SystemProgram,
//   Transaction,
//   Keypair,
//   PublicKey,
// } from "@solana/web3.js";
// import {
//   TOKEN_2022_PROGRAM_ID,
//   getMintLen,
//   ExtensionType,
//   createInitializeMintInstruction,
//   createInitializeMetadataPointerInstruction,
//   getOrCreateAssociatedTokenAccount,
//   mintTo,
// } from "@solana/spl-token";
// import { connection } from "../config/rpcConfig.js";

// const CreateToken2022 = () => {
//   const { publicKey, signTransaction } = useWallet();
//   const [mintAddress, setMintAddress] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const createToken = async () => {
//     try {
//       if (!publicKey || !signTransaction) {
//         alert("Please connect your wallet first!");
//         return;
//       }

//       setLoading(true);

//       // STEP 1 — Create Mint & Initialize Mint
//       const mintKeypair = Keypair.generate();
//       const mintLen = getMintLen([ExtensionType.MetadataPointer]);
//       const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

//       const createMintIx = SystemProgram.createAccount({
//         fromPubkey: publicKey,
//         newAccountPubkey: mintKeypair.publicKey,
//         space: mintLen,
//         lamports,
//         programId: TOKEN_2022_PROGRAM_ID,
//       });

//       const initMintIx = createInitializeMintInstruction(
//         mintKeypair.publicKey,
//         9, // decimals
//         publicKey, // mint authority
//         publicKey, // freeze authority
//         TOKEN_2022_PROGRAM_ID
//       );

//       const tx1 = new Transaction().add(createMintIx, initMintIx);
//       tx1.feePayer = publicKey;
//       tx1.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//       tx1.partialSign(mintKeypair);

//       const signedTx1 = await signTransaction(tx1);
//       const tx1Sig = await connection.sendRawTransaction(signedTx1.serialize());
//       await connection.confirmTransaction(tx1Sig, "confirmed");
//       console.log("✅ Mint Created:", mintKeypair.publicKey.toBase58());

//       // STEP 2 — Initialize MetadataPointer (points to off-chain JSON)
//       const initMetadataIx = createInitializeMetadataPointerInstruction(
//         mintKeypair.publicKey,
//         publicKey, // metadata authority = your wallet
//         publicKey, // payer = your wallet
//         TOKEN_2022_PROGRAM_ID
//       );

//       const tx2 = new Transaction().add(initMetadataIx);
//       tx2.feePayer = publicKey;
//       tx2.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

//       const signedTx2 = await signTransaction(tx2);
//       const tx2Sig = await connection.sendRawTransaction(signedTx2.serialize());
//       await connection.confirmTransaction(tx2Sig, "confirmed");
//       console.log("✅ MetadataPointer Initialized");

//       // STEP 3 — Create Associated Token Account & Mint Tokens
//       const ata = await getOrCreateAssociatedTokenAccount(
//         connection,
//         Keypair.generate(), // temporary payer
//         mintKeypair.publicKey,
//         publicKey,
//         false,
//         "confirmed",
//         { skipPreflight: false },
//         TOKEN_2022_PROGRAM_ID
//       );
//       console.log("✅ ATA:", ata.address.toBase58());

//       const mintTxSig = await mintTo(
//         connection,
//         Keypair.generate(), // dummy payer
//         mintKeypair.publicKey,
//         ata.address,
//         publicKey,
//         1_000_000_000n, // 1,000 tokens with 9 decimals
//         [],
//         undefined,
//         TOKEN_2022_PROGRAM_ID
//       );
//       console.log("✅ Minted Tokens:", mintTxSig);

//       setMintAddress(mintKeypair.publicKey.toBase58());
//       setLoading(false);
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={createToken}
//         disabled={loading}
//         className="px-4 py-2 bg-purple-600 text-white rounded-lg"
//       >
//         {loading ? "Creating..." : "Create Token 2022"}
//       </button>

//       {mintAddress && (
//         <p className="mt-3 text-green-400">
//           ✅ Mint Address: {mintAddress} <br />
//           <a
//             href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//             target="_blank"
//             rel="noreferrer"
//             className="underline text-blue-400"
//           >
//             View on Solana Explorer
//           </a>
//         </p>
//       )}
//     </div>
//   );
// };

// export default CreateToken2022;


import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  Transaction,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  ExtensionType,
  createInitializeMintInstruction,
  createInitializeMetadataPointerInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { connection } from "../config/rpcConfig.js"; // your preconfigured Connection

const CreateToken2022 = () => {
  const { publicKey, signTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // helper: fresh blockhash + set on tx
  const prepareTx = async (tx, payerPubkey) => {
    tx.feePayer = payerPubkey;
    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    tx.recentBlockhash = blockhash;
  };

  const createToken = async () => {
    if (!publicKey || !signTransaction) {
      alert("Connect wallet first");
      return;
    }
    setLoading(true);

    try {
      // --------- STEP 0: prepare a fresh mint keypair ----------
      const mintKeypair = Keypair.generate();
      const mintPubkey = mintKeypair.publicKey;

      // --------- STEP 1: create mint account & initialize mint ----------
      // Use MetadataPointer extension only (Token-2022). TokenMetadata on-chain helpers not stable in JS SDK.
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

      const createAccountIx = SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintPubkey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      });

      const initMintIx = createInitializeMintInstruction(
        mintPubkey,
        9, // decimals
        publicKey, // mint authority
        publicKey, // freeze authority (optional)
        TOKEN_2022_PROGRAM_ID
      );

      // Build tx1
      const tx1 = new Transaction().add(createAccountIx, initMintIx);
      // tx1 signed by mintKeypair and wallet
      await prepareTx(tx1, publicKey);
      tx1.partialSign(mintKeypair); // mint account must sign for createAccount
      const signedTx1 = await signTransaction(tx1); // wallet signs (fee payer & authorities)
      const raw1 = signedTx1.serialize();
      const sig1 = await connection.sendRawTransaction(raw1);
      await connection.confirmTransaction(sig1, "confirmed");
      console.log("✅ Mint account created:", mintPubkey.toBase58(), "sig:", sig1);

      // --------- STEP 2: initialize MetadataPointer (pointing to off-chain JSON) ----------
      // Note: use wallet as metadata authority and payer
      const initMetadataIx = createInitializeMetadataPointerInstruction(
        mintPubkey,
        publicKey, // metadata authority (must sign)
        publicKey, // payer (must sign)
        TOKEN_2022_PROGRAM_ID
      );

      const tx2 = new Transaction().add(initMetadataIx);
      await prepareTx(tx2, publicKey);
      const signedTx2 = await signTransaction(tx2);
      const raw2 = signedTx2.serialize();
      const sig2 = await connection.sendRawTransaction(raw2);
      await connection.confirmTransaction(sig2, "confirmed");
      console.log("✅ MetadataPointer initialized, sig:", sig2);

      // OPTIONAL: write the off-chain metadata pointer value (many clients expect pointer -> mint acct)
      // Token-2022 MetadataPointer simply indicates where to read metadata (some clients expect pointer to be the mint itself).
      // We'll rely on the mint acct being the pointer (so your front-end should fetch off-chain JSON at the URI you publish elsewhere).

      // --------- STEP 3: create ATA (if not exists) ----------
      // derive associated token address for this mint + user
      const ataAddress = await getAssociatedTokenAddress(
        mintPubkey,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID // token program for which ATA is derived (Token-2022)
      );

      // check if ATA exists
      const ataInfo = await connection.getAccountInfo(ataAddress);
      if (!ataInfo) {
        // create ATA instruction
        const createAtaIx = createAssociatedTokenAccountInstruction(
          publicKey, // payer
          ataAddress, // associated token account address to create
          publicKey, // owner of the ATA
          mintPubkey, // mint
          TOKEN_2022_PROGRAM_ID // token program id
        );

        const tx3 = new Transaction().add(createAtaIx);
        await prepareTx(tx3, publicKey);
        const signedTx3 = await signTransaction(tx3);
        const raw3 = signedTx3.serialize();
        const sig3 = await connection.sendRawTransaction(raw3);
        await connection.confirmTransaction(sig3, "confirmed");
        console.log("✅ ATA created:", ataAddress.toBase58(), "sig:", sig3);
      } else {
        console.log("ℹ️ ATA already exists:", ataAddress.toBase58());
      }

      // --------- STEP 4: mint tokens to ATA ----------
      // create mintTo instruction (Token-2022 program id)
      const amount = BigInt(1_000_000_000); // 1,000 tokens with 9 decimals
      const mintToIx = createMintToInstruction(
        mintPubkey,
        ataAddress,
        publicKey, // mint authority (must sign)
        Number(amount) === amount ? Number(amount) : amount, // can be bigint or number depending on SDK
        [], // signers (none, since authority is wallet)
        TOKEN_2022_PROGRAM_ID
      );

      const tx4 = new Transaction().add(mintToIx);
      await prepareTx(tx4, publicKey);
      const signedTx4 = await signTransaction(tx4);
      const raw4 = signedTx4.serialize();
      const sig4 = await connection.sendRawTransaction(raw4);
      await connection.confirmTransaction(sig4, "confirmed");
      console.log("✅ Minted tokens to ATA:", ataAddress.toBase58(), "sig:", sig4);

      // done
      setMintAddress(mintPubkey.toBase58());
      setLoading(false);
      console.log("🎉 Token creation flow complete. Mint:", mintPubkey.toBase58());
    } catch (err) {
      console.error("❌ createToken error:", err);
      // If SendTransactionError, try to log simulation logs
      if (err && err.logs) console.error("Logs:", err.logs);
      if (err && err.message) console.error("Message:", err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={createToken}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        {loading ? "Creating..." : "Create Token 2022"}
      </button>

      {mintAddress && (
        <p className="mt-3 text-green-400 break-words">
          ✅ Mint Address: {mintAddress} <br />
          <a
            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-400"
          >
            View on Solana Explorer (devnet)
          </a>
        </p>
      )}
    </div>
  );
};

export default CreateToken2022;
