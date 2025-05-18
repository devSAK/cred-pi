const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/payments/create", async (req, res) => {
  const { user_uid, amount, memo, metadata } = req.body;

  try {
    const response = await fetch("https://api.minepi.com/payments", {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        memo,
        metadata,
        uid: user_uid,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Payment creation failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit process if needed:
  // process.exit(1);
});
