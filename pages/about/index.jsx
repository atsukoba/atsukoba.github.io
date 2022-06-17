import Container from "../../components/Container";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import MetaData from "../../components/MetaData";

function About({ content, data }) {
  return (
    <Container>
      <MetaData
        title={"Atsuya Kobayashi"}
        description={"About Atsuya Kobayashi (小林篤矢)"}
        postType={""}
        slug={""}
        keyVisual={"/images/me.jpg"}
      />
      <article className="article about">
        <h1>About Me</h1>
        <div className="about__photo"></div>
        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock }}
          className="article__contents"
        />
      </article>
    </Container>
  );
}

export default About;

About.getInitialProps = async () => {
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../blogs/pages/about.md`);
  const data = matter(content.default);
  return { ...data };
};
