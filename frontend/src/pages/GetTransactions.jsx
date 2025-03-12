import React from 'react'
import { useGetPaymentsQuery } from "../redux/api/PaymentApiSlice";
import { useParams } from "react-router-dom";
import { useGetAccountsQuery } from '../redux/api/WalletApiSlice';
const GetTransaction = () => {
    const { data, error, isError, isLoading } = useGetPaymentsQuery();
    const { walletkey } = useParams(); // Get the public key from the route
    const { data: AccountData } = useGetAccountsQuery(); // ✅ Hook at the top
    const account = AccountData?.message?.find(acc => acc.public_key === walletkey);

    if (isLoading) {
        return <div>Loading transactions...</div>;
    }
    console.log("Wallet", walletkey)
    if (isError) {
        return <div>Error fetching transactions: {error.message}</div>;
    }
    console.log("Data", data)
    console.log(data.payments);
    // Filter transactions based on the selected wallet key
    const filteredTransactions = data?.payments?.filter(
        (transaction) => transaction.sender_key === walletkey
    );
    console.log(filteredTransactions);
    const transactions = data?.payments || [];
const stransactions = [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className='p-10'>
            {/* <div className="bg-[#2b2b2b] flex justify-between p-3 rounded-lg">
                <h2 className=''><strong>Transactions for Wallet:</strong> {walletkey}</h2>
                <p>
                    <strong>Balance:</strong>{" "}
                    {account?.balance ? parseFloat(account.balance).toFixed(2) : "N/A"} SOL
                </p>
            </div> */}

            {stransactions && stransactions.length > 0 ? (
                <div className="overflow-x-auto p-1 ">
                    <table className="min-w-full bg-[#2b2b2b] text-white border border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-[#1a1a1a] text-center">
                                <th className="p-2 border border-gray-600">S.No</th>
                                <th className="p-2 border border-gray-600">Sender Key</th>
                                <th className="p-2 border border-gray-600">Receiver Key</th>
                                <th className="p-2 border border-gray-600">Receiver Name</th>
                                <th className="p-2 border border-gray-600">Amount (SOL)</th>
                                <th className="p-2 border border-gray-600">Type</th>
                                <th className="p-2 border border-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stransactions.map((txn, index) => (
                                <tr key={index} className="hover:bg-[#3a3a3a] text-center">
                                    <td className="p-2 border border-gray-600">{index + 1}</td>
                                    <td className="p-2 border border-gray-600">{txn.sender_key}</td>
                                    <td className="p-2 border border-gray-600">{txn.receiver_key}</td>
                                    <td className="p-2 border border-gray-600">{txn.receivername}</td>
                                    <td className="p-2 border border-gray-600">{txn.amount?.toFixed(4)} SOL</td>
                                    <td className="p-2 border border-gray-600">{txn.category}</td>
                                    {/* <td className="p-2 border border-gray-600">{txn.createdAt}</td> */}
                                    <td className="p-2 border border-gray-600">
                            {new Date(txn.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                            })}
                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No transactions found for this wallet.</p>
            )}

        </div>
    );
};

export default GetTransaction;
