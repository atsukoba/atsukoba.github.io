import React, { Component } from "react";
import "../sass/style.scss";

const KeyVisual = (props) => {
  const style = {
    backgroundImage: `url(${props.imageFileName || "undefined.jpg"})`,
  };

  return <div className="key-visual" style={style}></div>;
};

export default KeyVisual;
