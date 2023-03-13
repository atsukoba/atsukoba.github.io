import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  dark,
  vsDark,
  materialDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

// const CodeBlock = ({ language, value }) => {
//   return (
//     <SyntaxHighlighter
//       showLineNumbers={true}
//       language={language}
//       style={darcula}
//     >
//       {value}
//     </SyntaxHighlighter>
//   );
// };

const CodeBlock = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={materialDark}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
