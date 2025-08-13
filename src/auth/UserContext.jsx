import React, { createContext, useContext } from "react";
import useAuth from "./useAuth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const auth = useAuth();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};
