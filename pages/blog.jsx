import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import Container from "../components/Container";

const Index = ({ data, title, description }) => {
  const ListItems = data
    .map((blog) => matter(blog))
    .map((listItem) => listItem.data);

  return (
    <Container>
      <h1>Blog ✍ </h1>
      <div>
        <ul>
          {ListItems.map((blog, i) => (
            <li className="card card__post" key={i}>
              <span className="card__post__tag">{blog.tag}</span>
              <span className="card__post__date">{blog.date}</span>
              <Link href={`/${blog.slug}`}>
                <h1 className="card__post__title">{blog.title}</h1>
              </Link>
              <p className="card__post__description">{blog.description}</p>
              <a href="">Read More...</a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Index;

export async function getStaticProps() {
  const siteData = await import(`../config.json`);
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((fn) => fn.endsWith(".md"));

  // const data = matter(content.default);
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
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
