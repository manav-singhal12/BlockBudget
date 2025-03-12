import React from "react";
import { useGetAccountsQuery } from "../redux/api/WalletApiSlice";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const GetAccounts = () => {
  const { data, error, isError, isLoading } = useGetAccountsQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const accounts = data?.success && data?.message?.length > 0 ? data.message : [];

  // Prepare data for Pie Chart
  const chartData = {
    labels: accounts.map((acc) => acc.public_key.slice(0, 6) + "..."), // Shortened Public Key
    datasets: [
      {
        label: "Balance (SOL)",
        data: accounts.map((acc) => acc.balance),
        backgroundColor: [
          "#8807f3",
          "#07f39c",
          "#f39c07",
          "#f3073a",
          "#0788f3",
          "#f307f3",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 px-10">
      <h2 className="text-2xl">Your Accounts</h2>
      <br />

      {/* Pie Chart Section */}
      {accounts.length > 0 && (
        <div className="w-full max-w-md mx-auto mb-10">
          <h3 className="text-lg text-center mb-2">Balance Distribution</h3>
          <Pie data={chartData} />
        </div>
      )}

      {/* Account Cards */}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {accounts.map((account, index) => (
            <div key={index} className="p-4 text-white rounded-2xl shadow-lg bg-[#2b2b2b]">
              <p className="text-center bg-white text-black text-lg rounded-2xl">Account {index + 1}</p>
              <br />
              <p><strong>Public Key:</strong> {account.public_key}</p>
              <br />
              <p><strong>Balance:</strong> {account.balance ? parseFloat(account.balance).toFixed(2) : "N/A"} SOL</p>
              <br />
              <div className="flex justify-between">
                <button className="bg-white text-black p-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/transactions/${account.public_key}`)}>
                  See Transactions
                </button>
                <button className="bg-[#8807f3] hover:bg-[#5A03AD] transition p-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/updatetransactions/${account.public_key}`)}>
                  Update Transactions
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No accounts found.</p>
      )}
    </div>
  );
};

export default GetAccounts;
