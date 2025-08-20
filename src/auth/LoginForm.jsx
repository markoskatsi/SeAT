import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputField from "./inputField";
import { useUser } from "./UserContext";
import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = React.useState({});
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, refreshUser } = useUser();

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const success = await login(data.email, data.password);
      if (success) {
        await refreshUser();
        navigate("/");
      } else {
        setError({
          type: "form",
          text: "Login failed. Please check your credentials.",
        });
      }
    } catch (err) {
      setError({ type: "form", text: "An error occurred. Please try again." });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Login</h1>
        <form onSubmit={onFormSubmit}>
          <InputField
            title="Email"
            type="email"
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
            errorMsg={error.type === "email" ? error.text : undefined}
          />
          <InputField
            title="Password"
            type="password"
            onChange={(e) =>
              setData((d) => ({ ...d, password: e.target.value }))
            }
            errorMsg={error.type === "password" ? error.text : undefined}
          />
          {error.type === "form" && (
            <div style={{ color: "red" }}>{error.text}</div>
          )}
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <NavLink className="navItem" to="/register">
            Click Here
          </NavLink>
        </p>
      </div>
    </div>
  );
}
