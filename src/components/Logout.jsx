import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Login";
const Logout = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("Token");
    navigate("/login");
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
