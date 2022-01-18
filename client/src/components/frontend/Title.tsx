interface Props {
  title: string;
  subTitle: string;
}

const Title: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className="title container">
      <h1 className="title__main">{title}</h1>
      <p className="title__subTitle">{subTitle}</p>
    </div>
  );
};

export default Title;
