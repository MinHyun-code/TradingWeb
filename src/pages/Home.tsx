import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/Login">Go to MyPage</Link>
    </>
  );
};

export default Home;
