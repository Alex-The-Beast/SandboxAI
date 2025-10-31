import {
  SystemProgram,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  ExtensionType,
  createInitializeMintInstruction,
  createInitializeMetadataPointerInstruction,
  createUpdateMetadataInstruction,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

import { connection } from "../../config/rpcConfig.js";
export const createTokenProgram = async () => {
  try {
    //generate new mint keypair
    // STEP 1 — Create Mint Account
    const mintKeypair = Keypair.generate();
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen
    );

    const createMintIx = SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: mintLen,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    });

    // STEP 2 — Initialize Metadata Pointer Extension
    const initMetadataIx = createInitializeMetadataPointerInstruction(
      mintKeypair.publicKey,
      publicKey,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID
    );

    // STEP 3 — Initialize Mint
    const initMintIx = createInitializeMintInstruction(
      mintKeypair.publicKey,
      9, // decimals
      publicKey,
      publicKey,
      TOKEN_2022_PROGRAM_ID
    );

    // Combine all instructions
    const tx = new Transaction().add(createMintIx, initMetadataIx, initMintIx);

    // User signs & sends transaction
    tx.feePayer = publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.partialSign(mintKeypair);
    const signedTx = await signTransaction(tx);
    const txSig = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txSig, "confirmed");

    console.log("✅ Mint Created:", mintKeypair.publicKey.toBase58());

    // STEP 4 — Add Metadata
    const metadata = {
      updateAuthority: publicKey,
      mint: mintKeypair.publicKey,
      name: "K9-Beast",
      symbol: "K9",
      uri: "https://example.com/metadata.json",
    };

    const metadataIx = createUpdateMetadataInstruction(
      metadata,
      TOKEN_2022_PROGRAM_ID
    );

    const metadataTx = new Transaction().add(metadataIx);
    metadataTx.feePayer = publicKey;
    metadataTx.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const signedMetaTx = await signTransaction(metadataTx);
    const metaSig = await connection.sendRawTransaction(
      signedMetaTx.serialize()
    );
    await connection.confirmTransaction(metaSig, "confirmed");

    console.log("✅ Metadata Added");

    // STEP 5 — Create Associated Token Account for user
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      Keypair.generate(), // temporary payer (not used)
      mintKeypair.publicKey,
      publicKey,
      false,
      "confirmed",
      { skipPreflight: false },
      TOKEN_2022_PROGRAM_ID
    );

    console.log("✅ ATA:", ata.address.toBase58());

    // STEP 6 — Mint Tokens
    const mintTxSig = await mintTo(
      connection,
      Keypair.generate(), // dummy payer, only wallet authority matters
      mintKeypair.publicKey,
      ata.address,
      publicKey,
      1_000_000_000n, // 1,000 tokens
      [],
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    console.log("✅ Minted Tokens:", mintTxSig);

    return mintKeypair.publicKey.toBase58();
  } catch (error) {
    console.log(error, "Error in create token program");
    return toast.error("Error in creating token program", {
      position: "bottom-right",
      autoClose: 3000,
    });
  }
};
