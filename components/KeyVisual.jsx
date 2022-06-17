import React, { Component } from "react";

const KeyVisual = (props) => {
  const style = {
    backgroundImage: `url(${props.imageFileName || "undefined.jpg"})`,
  };

  return <div className="key-visual" style={style}></div>;
};

export default KeyVisual;
