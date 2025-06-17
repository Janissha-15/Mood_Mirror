import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-pink-100 shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-pink-700">Mood Journal</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-white hover:bg-pink-100 border border-pink-500 text-pink-600 font-semibold px-4 py-2 rounded-lg transition"
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;
