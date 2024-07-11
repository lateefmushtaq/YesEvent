import MyButton from "./buttons/CreateEventButton";
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
      <MyButton
        coloronhover="#ee4e4e"
        backgroundcolor="#fff"
        color="#ee4e4e"
        handleClick={handleLogout}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
      </MyButton>
    </div>
  );
};

export default Logout;
