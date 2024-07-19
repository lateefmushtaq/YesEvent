import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("Token");
  // if (token === null) {
  //   return (
  //     <div>
  //       {/* <FontAwesomeIcon icon={faSpinner} /> */}
  //     </div>
  //   );
  // }
  if (token) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
