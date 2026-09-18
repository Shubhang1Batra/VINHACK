import { formatPrice } from "../lib/format";

export default function PricePanel({ recipe }) {
  const total = formatPrice(recipe.price, recipe.currency);
  const lines = (recipe.ingredients || []).filter((item) => item.price != null);

  if (!total && lines.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-4">
        <h2 className="font-serif text-xl">Price</h2>
        <p className="mt-2 text-sm text-stone-500">Price not available</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-4">
      <h2 className="font-serif text-xl">Price per recipe</h2>
      {total ? (
        <p className="mt-2 text-2xl font-medium text-orange-900">{total}</p>
      ) : null}
      {lines.length > 0 ? (
        <ul className="mt-3 divide-y divide-stone-100 text-sm">
          {lines.map((item) => (
            <li key={item.name} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>{formatPrice(item.price, recipe.currency)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3 text-xs text-stone-500">
        Amounts come from the recipe payload. The app does not estimate market prices in the browser.
      </p>
    </section>
  );
}
