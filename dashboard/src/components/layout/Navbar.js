import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Transceive } from "./transceive.svg";
import { ReactComponent as Idle } from "./idle.svg";

const Navbar = ({ loading, title }) => {
  return (
    <nav className="navbar bg-primary">
      <div style={{ display: "flex" }}>
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        {loading ? (
          <Transceive
            fill="limegreen"
            style={{ width: "40px", height: "40px", marginTop: "5px" }}
          />
        ) : (
          <Idle
            fill="white"
            style={{ width: "40px", height: "40px", marginTop: "5px" }}
          ></Idle>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Link to="/">Home</Link>
        <Link to="/course/words">Words</Link>
        <Link to="/course/sentences">Sentences</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Masterpiece dashboard",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
