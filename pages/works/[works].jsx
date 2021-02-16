import react from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import KeyVisual from "../../components/KeyVisual";

const Blog = ({ content, data }) => {
  return (
    <Container>
      <article>
        <Breadcrumb
          pathes={[
            { url: "/blog", title: "blog" },
            { url: `/blog/${data.slug}`, title: data.title },
          ]}
        />
        <KeyVisual imageFileName={data.keyVisual} />
        <h1>{data.title}</h1>
        <span>{data.date}</span>
        <p>{data.description}</p>
        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock }}
        />
      </article>
    </Container>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../blogs/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
