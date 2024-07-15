import React from "react";
import Events from "./events/Events";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <Link to={"/dashboard"}> Dashboard allows you to create events</Link>
      <Events />
    </div>
  );
}

export default Home;
