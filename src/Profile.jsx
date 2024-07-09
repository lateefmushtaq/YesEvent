import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    console.log("Profile component rendered");
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to your profile!</p>
    </div>
  );
};

export default Profile;
