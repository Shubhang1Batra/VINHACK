export default function IngredientList({ ingredients, substitutions = [], selected, onSwap }) {
  return (
    <section className="rounded-2xl bg-white p-4">
      <h2 className="font-serif text-xl">Ingredients</h2>
      <ul className="mt-3 space-y-3">
        {ingredients.map((item) => {
          const current = selected[item.name] || item.name;
          const options = substitutions
            .filter((pair) => pair.from.toLowerCase() === item.name.toLowerCase())
            .map((pair) => pair.to);
          const swapped = current !== item.name;

          return (
            <li key={item.name} className="text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span>
                  <span className="font-medium">{current}</span>
                  {item.quantity != null ? (
                    <span className="text-stone-500">
                      {" "}
                      · {item.quantity} {item.unit}
                    </span>
                  ) : null}
                </span>
                {swapped ? (
                  <span className="text-xs text-orange-800">
                    Using {current} instead of {item.name}
                  </span>
                ) : null}
              </div>
              {options.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onSwap(item.name, item.name)}
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      !swapped ? "bg-stone-800 text-white" : "bg-stone-100"
                    }`}
                  >
                    {item.name}
                  </button>
                  {options.map((alt) => (
                    <button
                      key={alt}
                      type="button"
                      onClick={() => onSwap(item.name, alt)}
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        current === alt ? "bg-stone-800 text-white" : "bg-stone-100"
                      }`}
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
