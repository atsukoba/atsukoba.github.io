import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
