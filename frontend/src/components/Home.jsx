import axios from "axios";

const Home = ({ user }) => {
  const handlePayment = async () => {
    try {
      const payment = await window.Pi.createPayment(
        {
          amount: 1,
          memo: "Welcome Bonus",
          metadata: { userId: user.uid || "guest" },
        },
        {
          onReadyForServerApproval: async (paymentId) => {
            await axios.post("https://cred-pi.onrender.com/payment-approve", {
              paymentId,
            });
          },
          onReadyForServerCompletion: async (paymentId, txid) => {
            await axios.post("https://cred-pi.onrender.com/payment-complete", {
              paymentId,
              txid,
            });
          },
          onCancel: (paymentId) => {
            console.log("Payment cancelled:", paymentId);
          },
          onError: (error, paymentId) => {
            console.error("Payment error:", error);
          },
        }
      );

      console.log("Payment created:", payment);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed: " + error.message);
    }
  };
  return (
    <div>
      <h1>Welcome to Pi, {user.username}!</h1>
      <button onClick={handlePayment}>Pay 1 Pi</button>
    </div>
  );
};

export default Home;
