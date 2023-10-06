import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [form, setForm] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user);
  console.log(
    "loadin and error state from redux===",
    error,
    "and",
    loading,
    "  user  ",
    currentUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const res = await response.json();
      console.log("successRes==", res);
      if (response.ok === false) {
        dispatch(signInFailure(res.error));
        return;
      } else {
        dispatch(signInSuccess(res));
        navigate("/");
        return;
      }
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Dont have an account ?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 ">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600 font-semibold text-center">
        {error ? error || "Something went wrong" : ""}
      </p>
    </div>
  );
}
