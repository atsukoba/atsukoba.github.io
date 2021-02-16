import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import Container from "../components/Container";
import { format } from "../helpers/dateFormat";

const Index = ({ data, title, description }) => {
  const ListItems = data
    .map((blog) => matter(blog))
    .map((listItem) => listItem.data);

  return (
    <Container>
      <div>
        <ul className="card_container">
          {ListItems.map((blog, i) => (
            <Link href={`/portofolio/${blog.slug}`}>
              <li className="card card__post" key={i}>
                <div
                  className="card__post__keyVisual"
                  style={{
                    backgroundImage: `url(/images/${
                      blog.keyVisual || "undefined.jpg"
                    })`,
                  }}
                ></div>
                <div className="card__post__info_wrapper">
                  <span className="card__post__category">{blog.category}</span>
                  <span className="card__post__date">{format(blog.date)}</span>
                  <h1 className="card__post__title">{blog.title}</h1>
                  {/* Tags */}
                  {blog.tags &&
                    blog.tags.map((tag, l) => (
                      <span className="card__post__tag" key={l}>
                        {tag}
                      </span>
                    ))}
                  <p className="card__post__description">{blog.description}</p>
                  <a href={`/portofolio/${blog.slug}`}>Read More...</a>
                </div>
              </li>
            </Link>
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
  const files = fs.readdirSync(`${process.cwd()}/portfolio`, "utf-8");
  const blogs = files.filter((fn) => fn.endsWith(".md"));
  console.log(blogs);

  // const data = matter(content.default);
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/portfolio/${blog}`;
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
