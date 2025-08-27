import React from "react";
import "./registerForm.scss";
import InputField from "./inputField";
import { NavLink } from "react-router-dom";
import { Modal, useModal } from "../components/UI/Modal";
import { Alert, Error } from "../components/UI/Notifications.jsx";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [error, setError] = React.useState({});
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const d = await res.json();
      if (d.error) {
        console.log("Login error:", d.error);
        setError(d.error);
        openError(d.error.text);
      } else {
        console.log("Login successful:", d);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="container">
      <div className="card-body">
        <h1>Sign up</h1>
        <form className="mx-1 mx-md-4" onSubmit={onFormSubmit}>
          <InputField
            title="Username"
            name="username"
            onChange={(e) =>
              setData((u) => ({ ...u, username: e.target.value }))
            }
          />
          <InputField
            title="Email"
            name="email"
            type="email"
            onChange={(e) => setData((u) => ({ ...u, email: e.target.value }))}
          />
          <div className="d-flex flex-row align-items-center">
            <div className="row">
              <div className="col-sm-6">
                <InputField
                  title="Password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  onChange={(e) =>
                    setData((u) => ({ ...u, password: e.target.value }))
                  }
                />
              </div>
              <div className="col-sm-6">
                <InputField
                  title="Repeat password"
                  name="password2"
                  type="password"
                  autocomplete="new-password"
                  onChange={(e) =>
                    setData((u) => ({
                      ...u,
                      password2: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-outline row flex-fill">
            <InputField
              type="date"
              title="Date of birth"
              name="dob"
              autocomplete="bday"
            />
          </div>
          &nbsp;
          <div className="checkbox-container">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="T&S"
            />
            <label className="form-check-label" htmlFor="T&S">
              I agree to the <a href="/terms-of-service">Terms of service</a>.
            </label>
          </div>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="registerButton">
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <NavLink className="navItem" to="/login">
            Click Here
          </NavLink>
        </p>{" "}
        <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
        <Error show={showError} message={ErrorContent} onDismiss={closeError} />
      </div>
    </section>
  );
}
