import React, { Component } from "react";

const FooterSocialLinks = ({ link, title }) => {
  return (
    <>
      <a
        id="lineShareButton"
        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
          title + " - atsuya.xyz\n\n" + link
        )}`}
        target="_blank"
        data-size="large"
      >
        <img src="/images/icon-line.png" alt="" />
      </a>
      <a
        id="twitterShareButton"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title + " - atsuya.xyz\n\n" + link
        )}`}
        rel="nofollow"
        data-size="large"
      >
        <img src="/images/icon-twitter.png" alt="" />
      </a>
    </>
  );
};

export default FooterSocialLinks;
