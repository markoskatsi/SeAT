import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./inputField";

export default function LoginForm() {
  const [error, setError] = React.useState({});
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });

      const d = await res.json();
      if (d.error) {
        console.log("Login error:", d.error);
        setError(d.error);
      } else {
        console.log("Login successful:", d);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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
            errorMsg={error.type == "email" ? error.text : undefined}
          />
          <InputField
            title="Password"
            type="password"
            onChange={(e) =>
              setData((d) => ({ ...d, password: e.target.value }))
            }
            errorMsg={error.type == "password" ? error.text : undefined}
          />
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
