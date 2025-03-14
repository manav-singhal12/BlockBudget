import React, { useState } from "react";
import { Buffer } from "buffer"; 
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useSendPaymentMutation } from "../redux/api/PaymentApiSlice";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const TransferFunds = () => {
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverKey, setReceiverKey] = useState("");
  const [receivername, setReceiverName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network);
  const [sendPayment] = useSendPaymentMutation();

  const connectWallet = async () => {
    try {
      if (!window.solana) {
        alert("Solana wallet not found! Please install Phantom Wallet.");
        return;
      }
      const response = await window.solana.connect();
      setWallet(response);
      setWalletAddress(response.publicKey.toString());
      setStatus("Wallet Connected!");
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const sendSol = async () => {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return null;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Amount must be greater than 0!");
      return null;
    }

    const receiverAddress = import.meta.env.VITE_SOLANA_RECEIVER_ADDRESS || receiverKey;
    if (!receiverAddress) {
      setStatus("Receiver address is not set!");
      console.error("Error: Receiver address is missing.");
      return null;
    }

    const destPubkey = new PublicKey(receiverAddress);
    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    try {
      const balance = await connection.getBalance(wallet.publicKey);
      console.log("Wallet balance:", balance / LAMPORTS_PER_SOL, "SOL");

      if (balance < lamports) {
        setStatus("Insufficient balance!");
        return null;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: destPubkey,
          lamports,
        })
      );

      transaction.feePayer = wallet.publicKey;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);

      console.log("Transaction Successful! Signature:", signature);
      setStatus(`Transaction Successful! Tx Hash: ${ellipsizeAddress(signature)}`);

      return signature;
    } catch (error) {
      console.error("Transaction Failed:", error);
      setStatus("Transaction Failed!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const transactionSignature = await sendSol();
    if (!transactionSignature) {
      setIsSubmitting(false);
      return;
    }

    const paymentData = {

      sender_key:walletAddress,
      receiver_key:receiverKey,
      receivername,
      amount,
      category,
      signature: transactionSignature,
    };

    try {
      await sendPayment(paymentData).unwrap();
      setReceiverKey("");
      setReceiverName("");
      setAmount("");
      setCategory("");

      alert("Transaction and Payment Recorded Successfully!");
    } catch (error) {
      console.error("Error sending payment data to backend:", error);
      alert("Failed to send payment data to backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ellipsizeAddress = (str) => {
    return str.length > 35 ? str.substr(0, 8) + "..." + str.substr(str.length - 8) : str;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6  ">
      <div className="bg-[#2b2b2b] rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center  mb-6"> Send Money</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Receiver Key */}
          <div>
            <label className="block text-sm font-medium  mb-2">Receiver Key</label>
            <input
              type="text"
              value={receiverKey}
              onChange={(e) => setReceiverKey(e.target.value)}
              placeholder="Enter Receiver Key"
              className="w-full p-3 border rounded-2xl mt-1 focus:outline-none border-black bg-black text-white"

              // className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          {/* {Receiver Name} */}
          <div>
            <label className="block text-sm font-medium  mb-2">Receiver Name</label>
            <input
              type="text"
              value={receivername}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Enter Receiver Name"
              className="w-full p-3 border rounded-2xl mt-1 focus:outline-none border-black bg-black text-white"
              
              // className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium  mb-2">Amount (SOL)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border rounded-2xl mt-1 focus:outline-none border-black bg-black text-white"
              
              // className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium  mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full p-3 border rounded-2xl mt-1 focus:outline-none border-black bg-black text-white"

              // className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Connect Wallet Button */}
          <button 
            type="button" 
            onClick={connectWallet} 
            className="w-full p-3 bg-[#8807f3] text-white rounded-lg uppercase font-semibold hover:bg-[#5A03AD] transition"

          >
            {wallet ? "Connected" : "Connect Wallet"}
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-[#8807f3] text-white rounded-lg uppercase font-semibold hover:bg-[#5A03AD] transition"

            // className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Send Money"}
          </button>
        </form>

        {/* Transaction Status */}
        {/* {status && <p className="text-center text-sm text-gray-600 mt-4">{status}</p>} */}
      </div>
    </div>
  );
};

export default TransferFunds;
