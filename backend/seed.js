const mongoose = require("mongoose");
require("dotenv").config({ path: "./backend/.env" });

const Ingredient = require("./models/Ingredient");
const Recipe = require("./models/Recipe");

const ingredientsData = [
    {
        name: "Tomato",
        avgPrice: 40,
        unit: "kg",
        seasonal: false,
        substitutes: []
    },
    {
        name: "Onion",
        avgPrice: 35,
        unit: "kg",
        seasonal: false,
        substitutes: []
    },
    {
        name: "Potato",
        avgPrice: 30,
        unit: "kg",
        seasonal: false,
        substitutes: []
    },
    {
        name: "Paneer",
        avgPrice: 320,
        unit: "kg",
        seasonal: false,
        substitutes: []
    },
    {
        name: "Capsicum",
        avgPrice: 80,
        unit: "kg",
        seasonal: true,
        substitutes: []
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Ingredient.deleteMany({});
        await Recipe.deleteMany({});

        const ingredients = await Ingredient.insertMany(ingredientsData);

        const tomato = ingredients.find(i => i.name === "Tomato");
        const onion = ingredients.find(i => i.name === "Onion");
        const potato = ingredients.find(i => i.name === "Potato");
        const paneer = ingredients.find(i => i.name === "Paneer");
        const capsicum = ingredients.find(i => i.name === "Capsicum");

        const recipes = [
            {
                title: "Paneer Capsicum Masala",
                ingredients: [
                    { ingredientId: paneer._id, qty: 200, unit: "g" },
                    { ingredientId: capsicum._id, qty: 1, unit: "piece" },
                    { ingredientId: onion._id, qty: 1, unit: "piece" },
                    { ingredientId: tomato._id, qty: 2, unit: "piece" }
                ],
                steps: [
                    "Chop the vegetables.",
                    "Cook onion and tomato with spices.",
                    "Add capsicum and paneer.",
                    "Cook for 5 minutes and serve."
                ],
                price: 150,
                story: "A simple homemade paneer recipe.",
                seasonal: false,
                isContestEntry: false
            },

            {
                title: "Aloo Tomato Curry",
                ingredients: [
                    { ingredientId: potato._id, qty: 3, unit: "piece" },
                    { ingredientId: tomato._id, qty: 2, unit: "piece" },
                    { ingredientId: onion._id, qty: 1, unit: "piece" }
                ],
                steps: [
                    "Boil and chop the potatoes.",
                    "Cook onion and tomato with spices.",
                    "Add potatoes and mix well.",
                    "Cook for a few minutes and serve."
                ],
                price: 80,
                story: "An easy everyday potato curry.",
                seasonal: false,
                isContestEntry: false
            },

            {
                title: "Simple Paneer Onion Fry",
                ingredients: [
                    { ingredientId: paneer._id, qty: 200, unit: "g" },
                    { ingredientId: onion._id, qty: 1, unit: "piece" }
                ],
                steps: [
                    "Cut paneer and onion.",
                    "Fry the onion with spices.",
                    "Add paneer and cook until lightly golden.",
                    "Serve hot."
                ],
                price: 120,
                story: "A quick paneer dish for busy days.",
                seasonal: false,
                isContestEntry: false
            }
        ];

        await Recipe.insertMany(recipes);

        console.log("Seed data added successfully");
        console.log("Ingredients:", ingredients.length);
        console.log("Recipes:", recipes.length);

        await mongoose.connection.close();
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
}

seedDatabase();