import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { format } from "../helpers/dateFormat";

const Card = ({ directory, post }) => {
  return (
    <Link href={`/${directory}/${post.slug}`}>
      <li className="card card__post">
        <div
          className="card__post__keyVisual"
          style={{
            backgroundImage: `url(/images/${
              post.keyVisual || "undefined.jpg"
            })`,
          }}
        ></div>
        <div className="card__post__info_wrapper">
          <div>
            <span className="card__post__category">{post.category}</span>
            <span className="card__post__date">{format(post.date)}</span>
          </div>
          <h1 className="card__post__title">{post.title}</h1>
          {/* Tags */}
          <div>
            {post.tags &&
              post.tags.map((tag, l) => (
                <span className="card__post__tag" key={l}>
                  {tag}
                </span>
              ))}
          </div>
          <p className="card__post__description">{post.description}</p>
        </div>
      </li>
    </Link>
  );
};

export default Card;
