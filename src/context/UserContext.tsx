import React, { createContext, useContext, useState, useEffect } from 'react';

type UserContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  toggleUser: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('hintro_user_id');
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem('hintro_user_id', userId);
    } else {
      localStorage.removeItem('hintro_user_id');
    }
  }, [userId]);

  const toggleUser = () => {
    setUserId((prev) => (prev === 'u1' ? 'u2' : 'u1'));
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, toggleUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
