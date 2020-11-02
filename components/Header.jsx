import React, { Component } from "react";
import Container from "./Container";
import "../sass/style.scss";

const Header = (props) => {
  return (
    <header>
      <div className="logo">
        <a href="/">atsuya.xyz</a>
        <span>v0.0.1</span>
      </div>
      <Container>
        <nav>
          <ul>
            <li>
              <a href="/about">About Me</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/cv">CV</a>
            </li>
            <li>
              <a href="/portfolio">Porfolio</a>
            </li>
            <li>
              <a href="https://twitter.com/atsuyakoba">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/atsukoba">GitHub</a>
            </li>
            <li>
              <a href="https://soundcloud.com/atsuyakoba">SoundCloud</a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
