const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    avgPrice: {
        type: Number,
        default: 0
    },

    unit: {
        type: String,
        required: true
    },

    seasonal: {
        type: Boolean,
        default: false
    },

    substitutes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient"
        }
    ]
});

module.exports = mongoose.model("Ingredient", ingredientSchema);