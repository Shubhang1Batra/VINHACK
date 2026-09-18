import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchRecipes } from "../api/client";
import FilterSortBar from "../components/FilterSortBar";
import RecipeGrid from "../components/RecipeGrid";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";

function sortRecipes(recipes, sort) {
  const copy = [...recipes];
  if (sort === "price") {
    copy.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
  } else if (sort === "time") {
    copy.sort(
      (a, b) =>
        (a.timeMinutes ?? Number.POSITIVE_INFINITY) -
        (b.timeMinutes ?? Number.POSITIVE_INFINITY),
    );
  } else if (sort === "ingredients") {
    copy.sort(
      (a, b) => (a.ingredients?.length ?? 0) - (b.ingredients?.length ?? 0),
    );
  } else {
    copy.sort((a, b) => (b.matchPercent ?? 0) - (a.matchPercent ?? 0));
  }
  return copy;
}

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const selected = (params.get("ingredients") || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [sort, setSort] = useState("match");

  function load() {
    if (selected.length === 0) {
      setRecipes([]);
      setStatus("empty-query");
      return;
    }
    setStatus("loading");
    searchRecipes(selected)
      .then((results) => {
        setRecipes(results);
        setStatus(results.length ? "ready" : "empty");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("ingredients")]);

  const shown = useMemo(() => sortRecipes(recipes, sort), [recipes, sort]);

  return (
    <div className="space-y-5">
      <p className="text-sm">
        <Link to="/" className="text-orange-800">
          ← Change ingredients
        </Link>
      </p>
      <h1 className="font-serif text-3xl">Recipes from your pantry</h1>
      {selected.length > 0 ? (
        <p className="text-sm text-stone-600">Matching: {selected.join(", ")}</p>
      ) : null}

      {status === "ready" ? (
        <FilterSortBar sort={sort} onSort={setSort} />
      ) : null}

      {status === "loading" ? <LoadingState label="Searching recipes…" /> : null}
      {status === "error" ? <ErrorState message={error} onRetry={load} /> : null}
      {status === "empty-query" ? (
        <EmptyState
          title="No ingredients selected"
          detail="Go back and pick at least one ingredient."
        />
      ) : null}
      {status === "empty" ? (
        <EmptyState
          title="No recipes overlap those ingredients"
          detail="Try adding rice, potato, tomato, or paneer from the demo catalog."
        />
      ) : null}
      {status === "ready" ? <RecipeGrid recipes={shown} /> : null}
    </div>
  );
}
