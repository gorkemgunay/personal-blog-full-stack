import type { NextPage } from "next";
import { useRouter } from "next/router";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import useSWR from "swr";
import withAuth from "../../../HOC/withAuth";

const AdminCategoryEdit: NextPage = () => {
  const router = useRouter();
  const { categoryId }: any = router.query;

  const category: any = useSWR(
    `http://localhost:4000/category/${categoryId}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const [name, setName] = useState("");

  useEffect(() => {
    if (category?.data?.data) {
      setName(category?.data?.data?.name);
    }
  }, [category?.data?.data]);
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Category Edit</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                fetch(`http://localhost:4000/category/delete/${categoryId}`, {
                  credentials: "include",
                });
                router.push("/admin/category");
              }}
              className="admin__bodyButton"
            >
              Delete Category
            </button>
          </div>
          <form
            className="admin__bodyForm"
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`http://localhost:4000/category/update/${categoryId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                }),
                credentials: "include",
              });
              router.push("/admin/category");
            }}
          >
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminCategoryEdit);
