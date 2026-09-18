import { Link } from "react-router-dom";
import { formatPrice } from "../lib/format";

export default function RecipeCard({ recipe }) {
  const price = formatPrice(recipe.price, recipe.currency);
  const initial = recipe.title?.[0] || "?";

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-orange-200 to-amber-100 font-serif text-4xl text-orange-900">
        {initial}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg text-stone-900">{recipe.title}</h3>
        <div className="mt-auto flex flex-wrap gap-2 text-xs text-stone-600">
          {recipe.matchPercent != null ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-green-800">
              {recipe.matchPercent}% match
            </span>
          ) : null}
          {recipe.timeMinutes != null ? (
            <span className="rounded-full bg-stone-100 px-2 py-1">
              {recipe.timeMinutes} min
            </span>
          ) : null}
          {price ? (
            <span className="rounded-full bg-amber-100 px-2 py-1">{price}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
