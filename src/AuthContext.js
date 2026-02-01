import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);

  // restore login on reload
  useEffect(() => {
    const saved = localStorage.getItem("isLogin");
    if (saved === "true") {
      setLogin(true);
    }
  }, []);

  const authorize = (user) => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    setLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUser");
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{ login ,authorize, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
