import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WordItem = ({ word: { id, dutch, english } }) => {
  return (
    <div className="card text-left">
      <Link to={`/word/id/${id}`} className="text-dark">
        <p>{dutch}</p>
        <p>{english}</p>
      </Link>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
};

export default WordItem;
