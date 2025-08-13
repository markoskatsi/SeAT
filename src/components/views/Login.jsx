import React, { useState } from "react";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/registerForm";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return (
      <div>
        <h2>Register</h2>
        <RegisterForm />
        <button onClick={() => setShowRegister(false)}>Back to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <button onClick={() => setShowRegister(true)}>Register</button>
    </div>
  );
}
