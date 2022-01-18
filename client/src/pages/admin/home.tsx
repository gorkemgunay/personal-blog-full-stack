import type { NextPage } from "next";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { useEffect, useState } from "react";
import useSWR from "swr";
import withAuth from "../../HOC/withAuth";

const AdminHome: NextPage = () => {
  const home: any = useSWR("http://localhost:4000/home", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  useEffect(() => {
    if (home?.data?.data) {
      setTitle(home?.data?.data?.title);
      setSubTitle(home?.data?.data?.subTitle);
      setPageTitle(home?.data?.data?.pageTitle);
      setMetaDescription(home?.data?.data?.metaDescription);
      setMetaKeywords(home?.data?.data?.metaKeywords);
    }
  }, [home?.data?.data]);
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Home Settings</h2>
          </div>
          <form
            className="admin__bodyForm"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:4000/home/update", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  title: title,
                  subTitle: subTitle,
                  pageTitle: pageTitle,
                  metaDescription: metaDescription,
                  metaKeywords: metaKeywords,
                }),
              });
            }}
          >
            <p>Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>Sub Title</p>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
            <p>Page Title</p>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
            <p>Meta Description</p>
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            <p>Meta Keywords</p>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminHome);
