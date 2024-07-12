import React from "react";
import Events from "./events/Events";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <Link to={"/dashboard"}>Dashboard</Link>
      <Events />
    </div>
  );
}

export default Home;
