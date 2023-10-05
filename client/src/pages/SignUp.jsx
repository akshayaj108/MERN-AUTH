import { Link, json } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    msg: "Something Went Wrong",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ ...error, isError: false });
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const res = await response.json();
      setForm({});
      setLoading(false);
      if (response.ok === false) {
        setError({ ...error, isError: true, msg: res });
      }
      console.log("server Response=", response);
      console.log("res", res);
    } catch (err) {
      setLoading(false);
      setError({ ...error, isError: true, msg: err?.message });
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-slate-200 p-3 rounded-lg"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="bg-slate-200 p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="bg-slate-200 p-3 rounded-lg"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 hover:opacity-95 rounded-lg uppercase disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Have an already account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 ">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600 font-semibold text-center">
        {error.isError && error.msg}
      </p>
    </div>
  );
}
