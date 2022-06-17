import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MetaData  from "../../components/MetaData";

const Index = ({ data, title, description }) => {
  const router = useRouter();

  const allContents = data
    .map((blog) => matter(blog))
    .map((listItem) => listItem.data);

  const allTags = Array.from(
    new Set(allContents.map((l) => l.tags).flat())
  ).sort();

  const postItems = allContents
    .filter(
      (listItem) =>
        !router.query.tag || listItem.tags.includes(router.query.tag)
    )
    .sort(function (a, b) {
      return -(a.date - b.date);
    });

  const handleScroll = (header, title) => {
    return () => {
      if (title.getBoundingClientRect().top < 45) {
        header.classList.add("jostled");
      } else {
        header.classList.remove("jostled");
      }
    };
  };

  useEffect(() => {
    if (document) {
      const header = document.querySelector("header .logo");
      const title = document.querySelector(".container > h1");

      if (header && title && window) {
        const handler = handleScroll(header, title);
        window.addEventListener("scroll", handler);
        return () => {
          window.removeEventListener("scroll", handler);
          header.classList.remove("jostled");
        };
      }
    }
  });

  return (
    <Container>
      <MetaData
        title={"Atsuya Kobayashi's Blog Posts"}
        description={"tech blogs by Atsuya Kobayashi (小林篤矢)"}
        postType={""}
        slug={""}
        keyVisual={"/images/me.jpg"}
      />
      <h1>Blog ✍</h1>
      <span>Tag:&nbsp;</span>
      <select
        name="select-post-tag"
        id="select-post-tag"
        value={router.query.tag}
        onChange={(e) => {
          router.push({
            pathname: "/blog",
            query: { tag: e.target.value },
          });
        }}
      >
        <option value={""} key={"option__0"}>
          All
        </option>
        {allTags.map((tag, i) => (
          <option value={tag} key={`option__${i + 1}`}>
            {tag}
          </option>
        ))}
      </select>
      <div>
        <ul className="card_container">
          {postItems.map((blog, i) => (
            <Card directory="blog" post={blog} idx={i} key={i} />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Index;

export async function getStaticProps() {
  const siteData = await import(`../../config.json`);
  const fs = require("fs");
  const files = fs.readdirSync(`${process.cwd()}/blogs`, "utf-8");
  const blogs = files.filter((fn) => fn.endsWith(".md"));

  // const data = matter(content.default);
  const data = blogs.map((blog) => {
    console.log(blog);
    if (blog) {
      const path = `${process.cwd()}/blogs/${blog}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      return rawContent;
    }
  });

  return {
    props: {
      data: data,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
