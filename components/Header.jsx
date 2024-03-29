import React, { Component } from "react";
import Container from "./Container";
import {
  faTwitter,
  faGithub,
  faSoundcloud,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              <h1>atsuya koba</h1>
              <span>v0.0.1</span>
            </a>
            <nav className={this.state.navOpen ? "opened" : ""}>
              <a href="/" className="logo nav-logo">
                <h1>atsuya koba</h1>
                <span>v0.0.1</span>
              </a>
              <ul>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/about">About Me</a>
                </li>
                {/* <li>
                  <a href="/cv">CV</a>
                </li> */}
                {/* <li>
                  <a href="/works">Portfolio</a>
                </li> */}
                <li>
                  <a
                    href="https://twitter.com/atsuyakoba"
                    target="_blank"
                    rel="nofollow"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/atsuyakoba"
                    target="_blank"
                    rel="nofollow"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/atsuyakobayashi"
                    target="_blank"
                    rel="nofollow"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/atsukoba"
                    target="_blank"
                    rel="nofollow"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://soundcloud.com/atsuyakoba"
                    target="_blank"
                    rel="nofollow"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faSoundcloud} />
                  </a>
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
