import { useMemo, useState } from "react";

export default function IngredientPicker({
  ingredients,
  selected,
  onToggle,
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ingredients;
    return ingredients.filter((item) => item.name.toLowerCase().includes(q));
  }, [ingredients, query]);

  return (
    <div className="space-y-3">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter ingredients…"
        className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-700"
      />
      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selected.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onToggle(name)}
              className="rounded-full bg-orange-800 px-3 py-1 text-sm text-white"
            >
              {name} ×
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">Select what you have on hand.</p>
      )}
      <div className="flex max-h-64 flex-wrap gap-2 overflow-auto rounded-xl bg-white p-3">
        {visible.length === 0 ? (
          <p className="text-sm text-stone-500">No ingredients match that filter.</p>
        ) : (
          visible.map((item) => {
            const isOn = selected.includes(item.name);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onToggle(item.name)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  isOn
                    ? "border-orange-800 bg-orange-800 text-white"
                    : "border-stone-300 bg-stone-50 text-stone-700"
                }`}
              >
                {item.name}
                {item.seasonal ? (
                  <span className="ml-1 text-[10px] uppercase tracking-wide opacity-80">
                    seasonal
                  </span>
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
