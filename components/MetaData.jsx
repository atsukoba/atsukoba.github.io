import React, { Component } from "react";
import "../sass/style.scss";
import { NextSeo } from "next-seo";

const MetaData = ({
  title,
  description,
  slug,
  postType,
  keyVisual,
}) => {
  return (
    <NextSeo
      title={title || "Simple Usage Example"}
      description={description || "A short description goes here."}
      openGraph={{
        url: `https://www.atsuya.xyz/${postType}/${slug}`,
        title: title || "Simple Usage Example",
        description: description || "A short description goes here.",
        images: [
          {
            url: `https://www.atsuya.xyz/images/${
              keyVisual || "undefined.jpg"
            }`,
            width: 800,
            height: 600,
            alt: "Og Image Alt",
          },
          {
            url: `https://www.atsuya.xyz/images/${
              keyVisual || "undefined.jpg"
            }`,
            width: 900,
            height: 800,
            alt: "Og Image Alt Second",
          },
          {
            url: `https://www.atsuya.xyz/images/${
              keyVisual || "undefined.jpg"
            }`,
          },
          {
            url: `https://www.atsuya.xyz/images/${
              keyVisual || "undefined.jpg"
            }`,
          },
        ],
        site_name: "atsuya.xyz",
      }}
      twitter={{
        handle: "@atsuyakoba",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default MetaData;
