// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    const validateToken = async () => {
      if (storedToken) {
        try {
          const response = await fetch("http://localhost:3000/auth/validate", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Token inválido ou expirado");

          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data.user);
        } catch (err) {
          console.error(err);
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = (token: string, userData: User) => {
  localStorage.setItem("authToken", token);
  setUser(userData);
  setIsLoggedIn(true);
};

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  const value: AuthContextType = { isLoggedIn, user, isLoading, login, logout };

  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  );
};
