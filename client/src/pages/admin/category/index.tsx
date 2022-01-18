import type { NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import withAuth from "../../../HOC/withAuth";

const AdminCategory: NextPage = () => {
  const categories: any = useSWR("http://localhost:4000/category", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Category Settings</h2>
            <Link href="/admin/category/add" passHref>
              <button className="admin__bodyButton">Add Category</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Related Posts</th>
              </tr>
            </thead>

            <tbody>
              {categories?.data?.data?.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/admin/category/${category.id}`}
                  passHref
                >
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      {category?.posts?.map((post: any, index: any) => (
                        <p key={index}>{post.title}</p>
                      ))}
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

export default withAuth(AdminCategory);
