import React from 'react'
import { useGetPaymentsQuery } from "../redux/api/PaymentApiSlice";
import { useParams } from "react-router-dom";

const CategorizedTransaction = () => {
    const { data, error, isError, isLoading } = useGetPaymentsQuery();
    const { walletkey } = useParams(); // Get the public key from the route

    if (isLoading) {
        return <div>Loading transactions...</div>;
    }

    if (isError) {
        return <div>Error fetching transactions: {error.message}</div>;
    }
    console.log(data.payments);
    // Filter transactions based on the selected wallet key
    const filteredTransactions = data?.payments?.filter(
        (transaction) => transaction.sender_key === walletkey
    );
    console.log(filteredTransactions);
    return (
        <div>
            <h2>Transactions for Wallet: {walletkey}</h2>
            {filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, index) => (
                    <div key={index} className="transaction-card">
                        <p><strong>Send to </strong>{txn.receiver_key}</p>
                        <p><strong>Amount:</strong> {txn.amount} SOL</p>
                        <p><strong>Type:</strong> {txn.category}</p>
                        <p><strong>Date:</strong> {txn.createdAt}</p>
                    </div>
                ))
            ) : (
                <p>No transactions found for this wallet.</p>
            )}
        </div>
    );
};

export default CategorizedTransaction;
