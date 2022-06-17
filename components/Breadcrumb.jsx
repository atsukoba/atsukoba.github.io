import React, { Component } from "react";

const Breadcrumb = (props) => {
  return (
    <div className="breadcrumb">
      {props.pathes &&
        props.pathes.map((path, idx) => (
          <span key={idx}>
            <span>/</span>
            <a href={path.url}>{path.title}</a>
          </span>
        ))}
    </div>
  );
};

export default Breadcrumb;
