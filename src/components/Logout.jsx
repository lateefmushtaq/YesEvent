import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("Token");
    navigate("/login");
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        onClick={handleLogout}
        style={{ marginLeft: "12px", color: "#ffffff" }}
      />
    </div>
  );
};

export default Logout;
