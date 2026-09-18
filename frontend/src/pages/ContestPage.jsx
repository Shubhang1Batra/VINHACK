import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContest } from "../api/client";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";

export default function ContestPage() {
  const [contest, setContest] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  function load() {
    setStatus("loading");
    getContest()
      .then((data) => {
        setContest(data);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }

  useEffect(() => {
    load();
  }, []);

  if (status === "loading") return <LoadingState label="Loading contest…" />;
  if (status === "error") return <ErrorState message={error} onRetry={load} />;

  const rows = contest?.leaderboard || [];

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl">{contest.title || "Contest"}</h1>
      {contest.rules?.length ? (
        <section className="rounded-2xl bg-white p-4">
          <h2 className="font-serif text-xl">Rules</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-700">
            {contest.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl bg-white p-4">
        <h2 className="font-serif text-xl">Leaderboard</h2>
        {rows.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="No scores yet" />
          </div>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b text-stone-500">
                  <th className="py-2 pr-3">Rank</th>
                  <th className="py-2 pr-3">Cook</th>
                  <th className="py-2 pr-3">Recipe</th>
                  <th className="py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.rank}-${row.name}`} className="border-b border-stone-100">
                    <td className="py-2 pr-3">{row.rank}</td>
                    <td className="py-2 pr-3">{row.name}</td>
                    <td className="py-2 pr-3">
                      {row.recipeId ? (
                        <Link className="text-orange-800" to={`/recipes/${row.recipeId}`}>
                          {row.recipeTitle || row.recipeId}
                        </Link>
                      ) : (
                        row.recipeTitle || "—"
                      )}
                    </td>
                    <td className="py-2">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
