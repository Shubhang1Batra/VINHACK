export default function FilterSortBar({ sort, onSort }) {
  return (
    <label className="flex items-center gap-2 text-sm text-stone-600">
      Sort
      <select
        value={sort}
        onChange={(event) => onSort(event.target.value)}
        className="rounded-lg border border-stone-300 bg-white px-2 py-1"
      >
        <option value="match">Best match</option>
        <option value="price">Price</option>
        <option value="time">Time</option>
        <option value="ingredients">Ingredient count</option>
      </select>
    </label>
  );
}
