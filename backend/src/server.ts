import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Budget Tracker API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
