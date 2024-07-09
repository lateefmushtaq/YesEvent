import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("Token");
    navigate("/login");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to your profile!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
