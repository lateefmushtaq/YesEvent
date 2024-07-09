import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    return <div>Loading...</div>;
  }
  if (auth?.token) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
