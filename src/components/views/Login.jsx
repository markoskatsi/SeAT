import { useState } from "react";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/registerForm";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return (
      <div>
        <RegisterForm />
      </div>
    );
  }

  return (
    <div>
      <LoginForm />
      <button onClick={() => setShowRegister(true)}>Sign Up</button>
    </div>
  );
}
