import type { NextPage } from "next";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import useSWR from "swr";
import withAuth from "../../HOC/withAuth";

const AdminUser: NextPage = () => {
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
            <h2 className="admin__bodyTitle">User Settings</h2>
          </div>
          <table>
            <thead>
              <tr>
                {/* <th>Post Id</th> */}
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
              </tr>
            </thead>

            <tbody>
              {users?.data?.data?.map((user: any) => (
                <tr key={user.id}>
                  {/* <td>{post.id}</td> */}
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminUser);
