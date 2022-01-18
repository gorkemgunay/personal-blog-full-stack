import type { NextPage } from "next";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../../../HOC/withAuth";

const AdminCategoryAdd: NextPage = () => {
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Add Category</h2>
          </div>

          <form
            className="admin__bodyForm"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:4000/category/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  name: categoryName,
                }),
              });
              router.push("/admin/category");
            }}
          >
            <p>Name</p>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button type="submit">Add Category</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminCategoryAdd);
