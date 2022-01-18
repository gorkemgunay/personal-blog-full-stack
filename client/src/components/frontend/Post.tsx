import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  title: string;
  shortDescription: string;
  body: string;
  image: string;
  author: string;
}

const Post: React.FC<Props> = ({
  slug,
  title,
  shortDescription,
  image,
  author,
}) => {
  return (
    <article className="post container">
      <div className="post__image">
        <Image
          src={image}
          alt={title}
          priority
          unoptimized
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="post__body">
        <small className="post__author">{author}</small>
        <h3 className="post__bodyTitle">{title}</h3>
        <p className="post__bodyParagraph">{shortDescription}</p>
        <Link href={`/${slug}`}>
          <a className="post__bodyButton">Read More</a>
        </Link>
      </div>
    </article>
  );
};

export default Post;
