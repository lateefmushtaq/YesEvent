import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      I am home !!
      <Link to="./login">Login here</Link>
    </div>
  );
}

export default Home;
