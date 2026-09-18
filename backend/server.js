const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");
require("./models/Ingredient");
require("dotenv").config({ path: "./backend/.env" });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/recipes", recipeRoutes);

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