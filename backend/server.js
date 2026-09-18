const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });