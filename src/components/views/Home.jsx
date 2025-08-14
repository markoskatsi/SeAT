import React from "react";
import "./Home.scss";
import { useUser } from "../../auth/UserContext";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { loggedInUser, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="home">
      <h1>Welcome to SeAT!</h1>
      {loggedInUser ? (
        <div>
          <p>Hello, {loggedInUser.user.name}!</p>
        </div>
      ) : (
        <div>
          <NavLink className="navItem" to="/login">
            Login
          </NavLink>
          <NavLink className="navItem" to="/register">
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
}
