// src/contexts/AuthContext.tsx
import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  loggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const loggedIn = !!token;

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);

    try {
      const decoded = jwtDecode<User>(newToken);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    // opcional: desconectar do Google
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      login(urlToken);
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) login(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
