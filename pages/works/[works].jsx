import react from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import KeyVisual from "../../components/KeyVisual";
import { format } from "../../helpers/dateFormat";

const Work = ({ content, data }) => {
  return (
    <Container>
      <article>
        <Breadcrumb
          pathes={[
            { url: "/", title: "work" },
            { url: `/work/${data.slug}`, title: data.title },
          ]}
        />
        <KeyVisual imageFileName={data.keyVisual} />
        <h1>{data.title}</h1>
        <span>{format(data.date)}</span>
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

export default Work;

Work.getInitialProps = async (context) => {
  const { works } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../portfolio/${works}.md`);
  const data = matter(content.default);

  return { ...data };
};
