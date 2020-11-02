import React, { Component } from "react";
import "../sass/style.scss";

const Breadcrumb = (props) => {
  return (
    <div className="breadcrumb">
      {props.pathes &&
        props.pathes.map((path, _) => {
          return (
            <>
              <span>/</span>
              <a href={path.url}>{path.title}</a>
            </>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
