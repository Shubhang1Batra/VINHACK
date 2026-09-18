const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const { ingredients } = req.query;

        if (!ingredients) {
            return res.status(400).json({
                message: "Please provide ingredients"
            });
        }

        const ingredientNames = ingredients
            .split(",")
            .map(name => name.trim().toLowerCase());

        const recipes = await Recipe.find()
            .populate("ingredients.ingredientId");

        const matchingRecipes = recipes.filter(recipe => {
            const recipeIngredientNames = recipe.ingredients.map(item =>
                item.ingredientId.name.toLowerCase()
            );

            return ingredientNames.every(name =>
                recipeIngredientNames.includes(name)
            );
        });

        res.json(matchingRecipes);

    } catch (error) {
        res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
});

module.exports = router;