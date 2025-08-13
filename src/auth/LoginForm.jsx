import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./inputField";
import { useUser } from "./UserContext";

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
        <h5 className="card-title">Login form</h5>
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
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
