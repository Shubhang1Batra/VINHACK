import ingredients from "../mocks/ingredients.json";
import recipes from "../mocks/recipes.json";
import substitutions from "../mocks/substitutions.json";
import contest from "../mocks/contest.json";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

function overlapScore(recipe, selectedNames) {
  const selected = new Set(selectedNames.map((name) => name.toLowerCase()));
  const names = recipe.ingredients.map((item) => item.name.toLowerCase());
  const matched = names.filter((name) => selected.has(name)).length;
  const matchPercent = names.length
    ? Math.round((matched / names.length) * 100)
    : 0;
  return { matched, matchPercent };
}

export function isMockMode() {
  return USE_MOCK;
}

export async function getIngredients() {
  if (USE_MOCK) {
    await delay();
    return ingredients;
  }
  // Proposed until backend confirms: GET /ingredients
  return fetchJson("/ingredients");
}

export async function searchRecipes(selectedNames) {
  if (USE_MOCK) {
    await delay();
    return recipes
      .map((recipe) => {
        const { matched, matchPercent } = overlapScore(recipe, selectedNames);
        return { ...recipe, matched, matchPercent };
      })
      .filter((recipe) => recipe.matched > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent || b.matched - a.matched);
  }
  const query = encodeURIComponent(selectedNames.join(","));
  // Proposed until backend confirms: GET /recipes/search?ingredients=...
  return fetchJson(`/recipes/search?ingredients=${query}`);
}

export async function getRecipe(id) {
  if (USE_MOCK) {
    await delay();
    const recipe = recipes.find((item) => item.id === id);
    if (!recipe) {
      const error = new Error("Recipe not found");
      error.status = 404;
      throw error;
    }
    return {
      ...recipe,
      substitutions: substitutions.filter((pair) =>
        recipe.ingredients.some(
          (item) => item.name.toLowerCase() === pair.from.toLowerCase(),
        ),
      ),
    };
  }
  // Proposed until backend confirms: GET /recipes/:id
  return fetchJson(`/recipes/${encodeURIComponent(id)}`);
}

export async function getSeasonalRecipes() {
  if (USE_MOCK) {
    await delay();
    return recipes.filter((recipe) => recipe.seasonal);
  }
  // No seasonal endpoint is specified. Mock-only until backend confirms a contract.
  return [];
}

export async function getContest() {
  if (USE_MOCK) {
    await delay();
    return contest;
  }
  // Proposed until backend confirms: GET /contest/leaderboard
  const leaderboard = await fetchJson("/contest/leaderboard");
  return { title: "Contest", rules: [], leaderboard };
}
