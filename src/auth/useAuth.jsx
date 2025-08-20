import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/session`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Session response:", data);
        setUser(data.session);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      await fetchUser();
      return true;
    }
    return false;
  };

  const register = async (username, email, password, password2) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ username, email, password, password2 }),
      }
    );
    return res.ok;
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.clear();
    window.location.reload();
  };

  return {
    loggedInUser: user,
    loading,
    login,
    register,
    logout,
    refreshUser: fetchUser,
  };
};

export default useAuth;
