import React, { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useParams } from "react-router-dom";
import { useGetPaymentsQuery, useSendPaymentMutation } from "../redux/api/PaymentApiSlice.js";

const WalletTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextSignature, setNextSignature] = useState(null);
  const { walletkey } = useParams();
  const walletAddress = walletkey;
  const [categoryInputs, setCategoryInputs] = useState({});
  const { data, error, isError, isLoading } = useGetPaymentsQuery();
  const [sendPayment] = useSendPaymentMutation();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!walletAddress) return;

      const connection = new Connection(
        "https://solemn-frequent-star.solana-devnet.quiknode.pro/7353cafcf2125f083c4ef4480b952c0ae9786b6c/"
      );
      try {
        const fetchChunk = async (before = null) => {
          const signatures = await connection.getSignaturesForAddress(
            new PublicKey(walletAddress),
            { limit: 10, before }
          );

          if (signatures.length === 0) {
            setLoading(false);
            return;
          }

          const transactionsDetails = await Promise.all(
            signatures.map(async (signatureInfo) => {
              const transaction = await connection.getTransaction(signatureInfo.signature, {
                commitment: "confirmed",
              });
              return transaction;
            })
          );

          setTransactions((prevTransactions) => [
            ...prevTransactions,
            ...transactionsDetails,
          ]);
          setNextSignature(signatures[signatures.length - 1].signature);
        };

        await fetchChunk(nextSignature);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress, nextSignature]);

  const loadMore = () => {
    if (!loading && nextSignature) {
      setLoading(true);
      fetchTransactions();
    }
  };

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    return <div>Error fetching transactions: {error.message}</div>;
  }

  // Get stored transactions' signatures
  const storedSignatures = new Set(data?.payments?.map((payment) => payment.signature));

  // Filter transactions not in the database
  const filteredTransactions = transactions.filter(
    (t) => !storedSignatures.has(t.transaction.signatures[0])
  );

  // Handle category input change
  const handleCategoryChange = (signature, value) => {
    setCategoryInputs((prev) => ({ ...prev, [signature]: value }));
  };

  // Handle add payment function
  const handleAddPayment = async (transaction) => {
    const signature = transaction.transaction.signatures[0];
    const category = categoryInputs[signature] || "Uncategorized";

    const paymentData = {
      sender_key: transaction.transaction.message.accountKeys[0].toString(),
      receiver_key: transaction.transaction.message.accountKeys[1].toString(),
      amount: ((transaction.meta.preBalances[0] - transaction.meta.postBalances[0] + transaction.meta.fee) / 1e9).toFixed(5),
      signature: signature,
      category: category,
      created_at: new Date(transaction.blockTime * 1000).toISOString(), // Storing timestamp
    };

    try {
      await sendPayment(paymentData);
      window.location.reload();
      alert("Payment added successfully!");
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment.");
    }
  };

  return (
    <div>
      <h3>Transactions for {walletAddress}</h3>
      <ul>
        {filteredTransactions.map((t, index) => (
          <li key={index}>
            <strong>Transaction {index + 1}:</strong>
            <p><strong>Time:</strong> {new Date(t.blockTime * 1000).toLocaleString()}</p>
            <p><strong>Amount Paid:</strong> {((t.meta.preBalances[0] - t.meta.postBalances[0] + t.meta.fee) / 1e9).toFixed(5)} SOL</p>
            <p><strong>Sender:</strong> {t.transaction.message.accountKeys[0].toString()}</p>
            <p><strong>Receiver:</strong> {t.transaction.message.accountKeys[1].toString()}</p>
            <p><strong>Signature:</strong> {t.transaction.signatures[0]}</p>

            <label>
              <strong>Category:</strong>
              <input
                type="text"
                placeholder="Enter category"
                value={categoryInputs[t.transaction.signatures[0]] || ""}
                onChange={(e) => handleCategoryChange(t.transaction.signatures[0], e.target.value)}
              />
            </label>

            <button onClick={() => handleAddPayment(t)}>Add Payment</button>
          </li>
        ))}
      </ul>

      {loading && <div>Loading more transactions...</div>}
      {!loading && nextSignature && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default WalletTransactions;
