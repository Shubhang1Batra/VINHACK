import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipe } from "../api/client";
import CreatorMonetisation from "../components/CreatorMonetisation";
import IngredientList from "../components/IngredientList";
import PricePanel from "../components/PricePanel";
import StoryBlock from "../components/StoryBlock";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";
import { formatPrice } from "../lib/format";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [swaps, setSwaps] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  function load() {
    setStatus("loading");
    getRecipe(id)
      .then((data) => {
        setRecipe(data);
        setSwaps({});
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus(err.status === 404 ? "missing" : "error");
      });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === "loading") return <LoadingState label="Loading recipe…" />;
  if (status === "error") return <ErrorState message={error} onRetry={load} />;
  if (status === "missing") {
    return (
      <EmptyState title="Recipe not found" detail="That id is not in the demo set." />
    );
  }

  const price = formatPrice(recipe.price, recipe.currency);

  return (
    <div className="space-y-5">
      <Link to={-1} className="text-sm text-orange-800">
        ← Back
      </Link>
      <header className="rounded-3xl bg-gradient-to-br from-orange-200 to-amber-50 p-6">
        <p className="text-sm text-stone-600">
          {recipe.timeMinutes != null ? `${recipe.timeMinutes} min` : null}
          {price ? ` · ${price}` : null}
          {recipe.isContestEntry ? " · Contest entry" : null}
        </p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">{recipe.title}</h1>
      </header>

      <StoryBlock story={recipe.story} />
      <PricePanel recipe={recipe} />
      <IngredientList
        ingredients={recipe.ingredients || []}
        substitutions={recipe.substitutions || []}
        selected={swaps}
        onSwap={(from, to) =>
          setSwaps((current) => ({ ...current, [from]: to }))
        }
      />
      <CreatorMonetisation recipe={recipe} />

      {recipe.steps?.length ? (
        <section className="rounded-2xl bg-white p-4">
          <h2 className="font-serif text-xl">Steps</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
