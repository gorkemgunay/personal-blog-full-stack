import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../components/frontend/Footer";
import Header from "../components/frontend/Header";
import Post from "../components/frontend/Post";
import Title from "../components/frontend/Title";

export const getServerSideProps: GetServerSideProps = async () => {
  const homeResponse = await fetch("http://localhost:4000/home");
  const postsResponse = await fetch("http://localhost:4000/post");

  const homeData = await homeResponse.json();
  const postsData = await postsResponse.json();

  return {
    props: {
      home: homeData.data,
      posts: postsData.data,
    },
  };
};

const Home: NextPage = ({ posts, home }: any) => {
  return (
    <>
      <Head>
        <title>{home?.pageTitle}</title>
        <meta name="description" content={home?.metaDescription} />
        <meta name="keywords" content={home?.metaKeywords} />
      </Head>
      <Header />

      <Title title={home?.title} subTitle={home?.subTitle} />

      <div className="posts">
        {posts?.map((post: any) => (
          <Post
            key={post?.id}
            slug={post?.slug}
            title={post?.title}
            shortDescription={post?.shortDescription}
            body={post?.body}
            image={post?.image}
            author={`${post?.user?.name} ${post?.user?.surname}`}
          />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Home;
