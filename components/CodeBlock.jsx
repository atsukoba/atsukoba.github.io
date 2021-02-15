import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      language={language}
      style={darcula}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
