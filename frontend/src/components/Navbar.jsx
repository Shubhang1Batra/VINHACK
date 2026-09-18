import { Link, NavLink } from "react-router-dom";
import { isMockMode } from "../api/client";

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm ${
    isActive ? "bg-orange-800 text-white" : "text-stone-700 hover:bg-orange-100"
  }`;

export default function Navbar() {
  return (
    <header className="border-b border-orange-100 bg-[#fffaf4]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-serif text-xl text-orange-950">
          Pantry
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/contest" className={linkClass}>
            Contest
          </NavLink>
          <button
            type="button"
            disabled
            title="Authentication is not specified yet"
            className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-400"
          >
            Log in
          </button>
        </nav>
      </div>
      {isMockMode() ? (
        <p className="bg-amber-100 px-4 py-1 text-center text-xs text-amber-900">
          Demo data — backend search/detail/contest routes are not live yet
        </p>
      ) : null}
    </header>
  );
}
