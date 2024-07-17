import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const [eventData, setEventData] = useState(() => {
    const storedEventData = localStorage.getItem("cards");
    return storedEventData ? JSON.parse(storedEventData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(eventData));
  }, [eventData]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setAuth({ token });
    } else {
      setAuth({ token: null });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        eventData,
        setEventData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
