import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Article from "../components/frontend/Article";
import Footer from "../components/frontend/Footer";
import Header from "../components/frontend/Header";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug }: any = context.params;
  const response = await fetch(`http://localhost:4000/post/${slug}`);
  const post = await response.json();

  return {
    props: {
      post: post?.data,
    },
  };
};

const ArticlePage: NextPage = ({ post }: any) => {
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.metaDescription} />
        <meta name="keywords" content={post?.metaKeywords} />
      </Head>

      <Header />
      <Article
        key={post?.id}
        title={post?.title}
        body={post?.body}
        image={post?.image}
      />
      <Footer />
    </>
  );
};

export default ArticlePage;
