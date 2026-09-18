import RecipeCard from "./RecipeCard";

export default function SeasonalShelf({ recipes }) {
  if (!recipes?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl text-stone-900">In season</h2>
      <p className="text-sm text-stone-600">
        Recipes tagged seasonal in the demo dataset.
      </p>
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-full gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="w-64 shrink-0">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
