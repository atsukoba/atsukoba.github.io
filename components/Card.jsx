import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { format } from "../helpers/dateFormat";

const Card = ({ directory, post, idx }) => {
  return (
    <li className="card card__post" key={`card__post__${idx}`}>
      <Link href={`/${directory}/${post.slug}`}>
        <div
          className="card__post__keyVisual"
          style={{
            backgroundImage: `url(${post.keyVisual || "/images/undefined.jpg"})`,
          }}
        ></div>
      </Link>
      <div className="card__post__info_wrapper">
        <div>
          <span className="card__post__category">{post.category}</span>
          <span className="card__post__date">{format(post.date)}</span>
        </div>
        <Link href={`/${directory}/${post.slug}`}>
          <h1 className="card__post__title">{post.title}</h1>
        </Link>
        {/* Tags */}
        <div>
          {post.tags &&
            post.tags.map((tag, l) => (
              <a href={`/${directory}/?tag=${encodeURIComponent(tag)}`}>
                <span className="card__post__tag" key={l}>
                  {tag}
                </span>
              </a>
            ))}
        </div>
        {/* <p className="card__post__description">{post.description}</p> */}
      </div>
    </li>
  );
};

export default Card;
