import Image from "next/image";
import "react-quill/dist/quill.bubble.css";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

interface Props {
  title: string;
  body: string;
  image: string;
}

const Article: React.FC<Props> = ({ title, body, image }) => {
  return (
    <>
      <article className="article container">
        <h2 className="article__title">{title}</h2>
        <div className="article__image">
          <Image
            src={image}
            alt={title}
            priority
            unoptimized
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="article__body">
          <ReactQuill value={body} readOnly={true} theme={"bubble"} />
        </div>
      </article>
    </>
  );
};

export default Article;
