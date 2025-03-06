import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { toast } from 'react-toastify'
import { useAddAccountMutation } from "../redux/api/WalletApiSlice.js";
import { Connection } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [addAccount,{isLoading}]=useAddAccountMutation();
  const connectWallet = async () => {
    if (!window.solana) {
      alert("Phantom Wallet not found!");
      return;
    }
    try {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());

      const connection = new Connection(clusterApiUrl("devnet"));
    const balance = await connection.getBalance(new PublicKey(response.publicKey.toString()))/1e9;
    
    console.log("Balance:", balance / 1e9, "SOL");

    const AccountData = {
      walletAddress: response.publicKey.toString(), 
      balance,
    };
    
    try {
      const result = await addAccount(AccountData).unwrap();
      toast.success("Wallet added successfully! ✅");
    } catch (apiError) {
      toast.error(apiError.message || "Failed to add wallet!");
    }
    
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
      console.error("Connection failed:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        Add Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
