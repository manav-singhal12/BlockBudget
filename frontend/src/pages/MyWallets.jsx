import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { toast } from 'react-toastify'
import { useEffect } from "react";
import { useAddAccountMutation} from '../redux/api/WalletApiSlice.js'
import { Connection } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import GetAccounts from "../components/GetAccounts.jsx";
const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [addAccount, { isLoading }] = useAddAccountMutation();
  // const { data: AccountData, error, isSuccess, isError } = useGetAccountsQuery();
  // console.log(AccountData);

  const connectWallet = async () => {
    if (!window.solana) {
      alert("Wallet not found!");
      return;
    }
    try {
      console.log("started")
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());

      // const connection = new Connection(clusterApiUrl("devnet"));
      const connection = new Connection("https://api.devnet.solana.com");

      const balance = await connection.getBalance(new PublicKey(response.publicKey.toString())) / 1e9;

      console.log("Balance:", balance / 1e9, "SOL");
      console.log(response.publicKey.toString());
      const AccountData = {
        public_key: response.publicKey.toString(),
        balance,
      };

      try {
        const result = await addAccount(AccountData).unwrap();
        toast.success("Wallet added successfully! ✅");
      } catch (apiError) {
        if (apiError.status === 401 && apiError.data?.message === "Account Already exists") {
          toast.error("This wallet is already added! 🚫");
        } else {
          toast.error(apiError.message || "Failed to add wallet!");
        }
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
      <GetAccounts/>
    </div>
  );
};

export default WalletConnect;
