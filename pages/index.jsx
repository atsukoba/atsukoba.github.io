import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import Container from "../components/Container";
import { format } from "../helpers/dateFormat";
import Card from "../components/Card";

const Index = ({ data, title, description }) => {
  const ListItems = data
    .map((blog) => matter(blog))
    .map((listItem) => listItem.data)
    .sort(function (a, b) {
      return -(a.date - b.date);
    });

  return (
    <Container>
      <div>
        <ul className="card_container">
          {ListItems.map((blog, i) => (
            <Card directory="works" post={blog} idx={i} key={i} />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export async function getStaticProps() {
  const siteData = await import(`../config.json`);
  const fs = require("fs");
  const files = fs.readdirSync(`${process.cwd()}/portfolio`, "utf-8");
  const works = files.filter((fn) => fn.endsWith(".md"));
  // const data = matter(content.default);
  const data = works.map((work) => {
    const path = `${process.cwd()}/portfolio/${work}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });
    return rawContent;
  });

  return {
    props: {
      data: data,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}

export default Index;
