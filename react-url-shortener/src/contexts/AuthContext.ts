// src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
// Importe as funções do seu SDK do Google (se estiver usando)

const AuthContext = createContext();

// Hook personalizado para facilitar o acesso
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado que é a "única fonte de verdade"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true

  // --- 1. Lógica de Verificação Inicial ---
  useEffect(() => {
    // 1. Tenta pegar o token do armazenamento local (localStorage)
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      // 2. Se o token existir, chame sua API para validar!
      // Exemplo (SUA LÓGICA DEVE ESTAR AQUI):
      api.validateToken(storedToken)
        .then(response => {
          // Token válido:
          setIsLoggedIn(true);
          setUser(response.data.user); // Pega dados do usuário do backend
        })
        .catch(() => {
          // Token inválido/expirado (401):
          localStorage.removeItem('authToken');
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false); // Sempre para de carregar no final
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // --- 2. Função de Login Unificada ---
  const login = (token, userData) => {
    // Armazena SEU JWT
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // --- 3. Função de Logout Simples ---
  const logout = () => {
    // 1. Limpa o armazenamento local
    localStorage.removeItem('authToken');
    
    // 2. Limpa o estado
    setUser(null);
    setIsLoggedIn(false);

    // 3. (OPCIONAL/RECOMENDADO): Chama o logout do Google para limpar a sessão externa
    // Ex: googleSdk.signOut(); 
  };
  
  // O valor que será disponibilizado para toda a aplicação
  const value = { isLoggedIn, user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};