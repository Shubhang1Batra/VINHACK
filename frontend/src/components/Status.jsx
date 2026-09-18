export function LoadingState({ label = "Loading…" }) {
  return (
    <p className="rounded-xl border border-dashed border-stone-300 bg-white px-4 py-8 text-center text-stone-500">
      {label}
    </p>
  );
}

export function EmptyState({ title, detail }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-4 py-8 text-center">
      <p className="font-medium text-stone-800">{title}</p>
      {detail ? <p className="mt-1 text-sm text-stone-500">{detail}</p> : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center">
      <p className="font-medium text-red-800">Something went wrong</p>
      <p className="mt-1 text-sm text-red-700">{message || "Please try again."}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-red-800 px-4 py-2 text-sm text-white"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
