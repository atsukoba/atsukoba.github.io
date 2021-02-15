import React, { Component } from "react";
import Container from "./Container";
import "../sass/style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    this.setState({ navOpen: !this.state.navOpen });
    e.preventDefault();
  }

  render() {
    return (
      <>
        <header>
          <Container>
            <a href="/" className="logo">
              <h1>atsuya.xyz</h1>
              <span>v0.0.1</span>
            </a>
            <nav className={this.state.navOpen ? "opened" : ""}>
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
        <button
          id="menuButton"
          onClick={this.toggleMenu}
          className={this.state.navOpen ? "clicked" : ""}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </>
    );
  }
}

export default Header;
