import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIngredients, getSeasonalRecipes } from "../api/client";
import IngredientPicker from "../components/IngredientPicker";
import SeasonalShelf from "../components/SeasonalShelf";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";

export default function HomePage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  function load() {
    setStatus("loading");
    Promise.all([getIngredients(), getSeasonalRecipes()])
      .then(([list, seasonalRecipes]) => {
        setIngredients(list);
        setSeasonal(seasonalRecipes);
        setStatus(list.length ? "ready" : "empty");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }

  useEffect(() => {
    load();
  }, []);

  function toggle(name) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  }

  function search() {
    const params = new URLSearchParams();
    params.set("ingredients", selected.join(","));
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-orange-900 px-6 py-10 text-orange-50">
        <p className="text-sm uppercase tracking-widest text-orange-200">
          Ingredients → recipes
        </p>
        <h1 className="mt-2 font-serif text-4xl">Cook from what you already have</h1>
        <p className="mt-3 max-w-xl text-orange-100">
          Pick pantry items, see overlapping recipes, check price, read the cook’s
          story, and jump out to a creator’s order link.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl">Your ingredients</h2>
        {status === "loading" ? <LoadingState label="Loading ingredients…" /> : null}
        {status === "error" ? (
          <ErrorState message={error} onRetry={load} />
        ) : null}
        {status === "empty" ? (
          <EmptyState
            title="No ingredients in the catalog"
            detail="The ingredient list is empty."
          />
        ) : null}
        {status === "ready" ? (
          <>
            <IngredientPicker
              ingredients={ingredients}
              selected={selected}
              onToggle={toggle}
            />
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={search}
              className="rounded-full bg-orange-800 px-5 py-2 text-white disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              Find recipes
            </button>
          </>
        ) : null}
      </section>

      {seasonal.length > 0 ? <SeasonalShelf recipes={seasonal} /> : null}
    </div>
  );
}
