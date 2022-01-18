import type { NextPage } from "next";
import useSWR from "swr";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import withAuth from "../../HOC/withAuth";

const AdminHome: NextPage = () => {
  const posts: any = useSWR("http://localhost:4000/post", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  const categories: any = useSWR("http://localhost:4000/category", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const users: any = useSWR("http://localhost:4000/user", (...args) =>
    fetch(...args, { credentials: "include" }).then((res) => res.json())
  );

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Dashboard</h2>
          </div>
          <div className="admin__stats">
            <div className="admin__stat">
              <p>Total Posts</p>
              <h4>{posts?.data?.data?.length}</h4>
            </div>
            <div className="admin__stat">
              <p>Total Categories</p>
              <h4>{categories?.data?.data?.length}</h4>
            </div>
            <div className="admin__stat">
              <p>Total Users</p>
              <h4>{users?.data?.data?.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminHome);
