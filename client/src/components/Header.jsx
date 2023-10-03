import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-red-500">Auth APP</h1>
        </Link>
        <ul className="flex gap-12">
          <Link to="/">
            <li className="font-semibold">Home</li>
          </Link>

          <Link to="/about">
            <li className="font-semibold">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="font-semibold">Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
