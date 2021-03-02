import react from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import MetaData from "../../components/MetaData";
import KeyVisual from "../../components/KeyVisual";
import { format } from "../../helpers/dateFormat";

const Work = ({ content, data }) => {
  return (
    <>
      <MetaData
        title={data.title}
        description={data.description}
        postType={"work"}
        slug={data.slug}
        description={data.description}
        keyVisual={data.keyVisual}
      />
      <Container>
        <article className="article">
          <Breadcrumb
            className="article__breadcrumb"
            pathes={[
              { url: "/", title: "work" },
              { url: `/work/${data.slug}`, title: data.title },
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
                <a href={`/work/?tag=${encodeURIComponent(tag)}`}>
                  <span className="card__post__tag" key={l}>
                    {tag}
                  </span>
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
      </Container>
    </>
  );
};

export async function getStaticProps(context) {
  // Import our .md file using the `slug` from the URL
  const { works } = context.params;
  const content = await import(`../../portfolio/${works}.md`);
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
  const files = fs.readdirSync(`${process.cwd()}/portfolio`, "utf-8");
  const works = files.filter((fn) => fn.endsWith(".md"));
  return {
    paths: works.map((w) => {
      return { params: { works: w.replace(".md", "") } };
    }),
    fallback: false,
  };
}

export default Work;
