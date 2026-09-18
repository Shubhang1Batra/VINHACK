const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    ingredients: [
        {
            ingredientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient"
            },
            qty: Number,
            unit: String
        }
    ],

    steps: {
        type: [String],
        required: true
    },

    price: {
        type: Number,
        default: 0
    },

    story: {
        type: String,
        default: ""
    },

    creatorLink: {
        type: String,
        default: ""
    },

    videoUrl: {
        type: String,
        default: ""
    },

    seasonal: {
        type: Boolean,
        default: false
    },

    isContestEntry: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);