import React from "react";
import { Link } from "react-router-dom";
const Nagivation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">my Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Nagivation;
