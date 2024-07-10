import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contextProvider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }
  if (auth?.token) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
