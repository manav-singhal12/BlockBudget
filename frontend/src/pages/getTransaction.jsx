import { Connection, PublicKey } from "@solana/web3.js";

// Replace with your Phantom wallet address
const walletAddress = new PublicKey("EV9ZmjC2htgiv6bjRTwWXv9abF8qsmUpS3Be8eELSNi8");

// Connect to Solana mainnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function getTransaction() {
    try {
        // Fetch recent transaction signatures
        const signatures = await connection.getSignaturesForAddress(walletAddress, { limit: 10 });

        console.log("Recent Transaction Signatures:", signatures);

        const transactions = [];

        for (let signature of signatures) {
            let tx = await connection.getTransaction(signature.signature, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0, // Ensures compatibility with newer transactions
            });

            if (tx) {
                
                transactions.push(tx);
            }
        }

        console.log("Full Transaction Details:", transactions);
        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

export default getTransaction;
