import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const initiatePiPayment = async () => {
    try {
      const scopes = ["payments"];

      const payment = await window.Pi.authenticate(
        scopes,
        async (paymentData) => {
          const response = await fetch(
            "https://5b30-2405-201-8023-e9d6-4d5e-49e5-dce0-457a.ngrok-free.app/api/payments/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_uid: paymentData.user.uid,
                amount: 0.001,
                memo: "Test Payment",
                metadata: { item: "Sample" },
              }),
            }
          );

          return await response.json();
        }
      );

      console.log("Payment Success:", payment);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pi Payment Integration</h1>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-xl"
        onClick={initiatePiPayment}
      >
        Pay with Pi
      </button>
    </div>
  );
}

export default App;
