import react from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import Container from "../../components/Container";
import FooterSocialLinks from "../../components/FooterSocialLinks";
import Breadcrumb from "../../components/Breadcrumb";
import MetaData from "../../components/MetaData";
import KeyVisual from "../../components/KeyVisual";
import { format } from "../../helpers/dateFormat";

const Blog = ({ content, data }) => {
  return (
    <>
      <MetaData
        title={data.title}
        description={data.description}
        postType={"blog"}
        slug={data.slug}
        description={data.description}
        keyVisual={data.keyVisual}
      />
      <Container>
        <article className="article">
          <Breadcrumb
            className="article__breadcrumb"
            pathes={[
              { url: "/blog", title: "blog" },
              { url: `/blog/${data.slug}`, title: data.title },
            ]}
          />
          <KeyVisual imageFileName={data.keyVisual} />
          <div className="article__info">
            <span className="article__category">{data.category}</span>
            <span className="article__date">{format(data.date)}</span>
          </div>
          <h1 className="article__title">{data.title}</h1>
          {/* Tags */}
          <div className="article__tags">
            {data.tags &&
              data.tags.map((tag, l) => (
                <a href={`/blog/?tag=${encodeURIComponent(tag)}`} key={l}>
                  <span className="card__post__tag">{tag}</span>
                </a>
              ))}
          </div>
          <p className="article__description">{data.description}</p>

          <hr />

          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock }}
            className="article__contents"
          />
        </article>
        <FooterSocialLinks
          title={data.title}
          link={`https://www.atsuya.xyz/blog/${data.slug}`}
        />
      </Container>
    </>
  );
};

export async function getStaticProps(context) {
  const { blog } = context.params;
  const content = await import(`../../blogs/${blog}`);
  const data = matter(content.default);
  console.dir(data);
  data.data.date = data.data.date.toJSON();
  return {
    props: {
      content: data.content,
      data: data.data,
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const files = fs.readdirSync(`${process.cwd()}/blogs`, "utf-8");
  const works = files.filter((fn) => fn.endsWith(".md"));
  return {
    paths: works.map((w) => {
      return { params: { blog: w } };
    }),
    fallback: false,
  };
}

export default Blog;
