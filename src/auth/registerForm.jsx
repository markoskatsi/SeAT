import React from "react";
import InputField from "./inputField";

export default function RegisterForm() {
  const [error, setError] = React.useState({});
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
      } else {
        console.log("Login successful:", d);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section
      className="d-flex flex-row align-items-center"
      style={{ backgroundColor: "#eee", padding: "0", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div className="card">
              <div className="card-body">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
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
                    onChange={(e) =>
                      setData((u) => ({ ...u, email: e.target.value }))
                    }
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
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="T&S"
                    />
                    <label className="form-check-label" htmlFor="T&S">
                      I agree to the{" "}
                      <a href="/terms-of-service">Terms of service</a>.
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>
                </form>
                <p>
                  Already have an account? <a href="/login">Click here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
