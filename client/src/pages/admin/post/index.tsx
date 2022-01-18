import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import withAuth from "../../../HOC/withAuth";

const AdminPost: NextPage = () => {
  const posts: any = useSWR("http://localhost:4000/post", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Post Settings</h2>
            <Link href="/admin/post/add" passHref>
              <button className="admin__bodyButton">Add Post</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Slug</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
              </tr>
            </thead>

            <tbody>
              {posts?.data?.data?.map((post: any) => (
                <Link key={post.id} href={`/admin/post/${post.slug}`} passHref>
                  <tr>
                    <td>{post.slug}</td>
                    <td>{post.title}</td>
                    <td>{post.category?.name}</td>
                    <td>
                      {post.user?.name} {post.user?.surname}
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminPost);
