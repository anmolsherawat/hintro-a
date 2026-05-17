import React, { createContext, useContext, useState, useEffect } from 'react';

type UserContextType = {
  userId: string;
  setUserId: (id: string) => void;
  toggleUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string>(() => {
    return localStorage.getItem('hintro_user_id') || 'u2'; // Default to u2 for data
  });

  useEffect(() => {
    localStorage.setItem('hintro_user_id', userId);
  }, [userId]);

  const toggleUser = () => {
    setUserId((prev) => (prev === 'u1' ? 'u2' : 'u1'));
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, toggleUser }}>
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
