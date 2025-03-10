import React from "react";
import { useGetAccountsQuery } from "../redux/api/WalletApiSlice";
import { useNavigate } from "react-router-dom";

const GetAccounts = () => {
  const { data, error, isError, isLoading } = useGetAccountsQuery(); // ✅ Hook at the top
  const navigate = useNavigate();

  // ✅ Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ✅ Handle error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Accounts</h2>
      {data?.success && data?.message?.length > 0 ? (
        data.message.map((account, index) => (
          <div key={index}>
            <p><strong>Public Key:</strong> {account.public_key}</p>
            <p><strong>Balance:</strong> {account.balance || "N/A"} SOL</p>
            <button onClick={() => navigate(`/transactions/${account.public_key}`)}>
              See Transactions
            </button>
            <button onClick={() => navigate(`/updatetransactions/${account.public_key}`)}>
              Update Transactions
            </button>
          </div>
        ))
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default GetAccounts;
