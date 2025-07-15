import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialisation ---------------------------
  // State -----------------------------------
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
    else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  // Handlers --------------------------------
  const login = (user) => setLoggedInUser(user);
  const logout = () => setLoggedInUser(null);

  // View ------------------------------------
  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);