// import React from "react";
// import { Line } from "react-chartjs-2";
// import { useGetBalanceHistoryQuery } from "../redux/api/WalletApiSlice";
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

// // Register Chart.js components
// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// const BalanceHistoryChart = () => {
//   const { data, error, isLoading } = useGetBalanceHistoryQuery();

//   if (isLoading) return <div>Loading Balance History...</div>;
//   if (error) return <div>Error fetching balance history!</div>;

//   // Assume API returns data in this format:
//   // { success: true, history: [{ month: "Jan", balance: 10 }, { month: "Feb", balance: 15 }, ...] }
//   const balanceHistory = data?.history || [];

//   // Prepare data for Chart.js
//   const chartData = {
//     labels: balanceHistory.map((entry) => entry.month), // X-axis labels (Months)
//     datasets: [
//       {
//         label: "Total Balance (SOL)",
//         data: balanceHistory.map((entry) => entry.balance), // Y-axis (Balance)
//         borderColor: "#8807f3",
//         backgroundColor: "rgba(136, 7, 243, 0.2)",
//         borderWidth: 2,
//         pointRadius: 4,
//         pointBackgroundColor: "#5A03AD",
//         tension: 0.4, // Creates the curvy effect
//         fill: true, // Makes the curve more visually appealing
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
//       <h3 className="text-center text-xl font-semibold mb-4">Balance History (Last 12 Months)</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default BalanceHistoryChart;
