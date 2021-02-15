import React, { Component } from "react";
import "../sass/style.scss";

const Breadcrumb = (props) => {
  return (
    <div className="breadcrumb">
      {props.pathes &&
        props.pathes.map((path, idx) => {
          return (
            <>
              <span>/</span>
              <a href={path.url} key={idx}>{path.title}</a>
            </>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
