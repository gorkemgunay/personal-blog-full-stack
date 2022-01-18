import type { NextPage } from "next";
import { useRouter } from "next/router";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import { useState } from "react";
import useSWR from "swr";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";
import withAuth from "../../../HOC/withAuth";

const AdminPostAdd: NextPage = () => {
  const categories: any = useSWR("http://localhost:4000/category", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  const me: any = useSWR("http://localhost:4000/user/me", (...args) =>
    fetch(...args, { credentials: "include" }).then((res) => res.json())
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  const router = useRouter();

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Add Post</h2>
          </div>

          <form
            className="admin__bodyForm"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:4000/post/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  title: title,
                  slug: slug,
                  shortDescription: shortDescription,
                  body: body,
                  image: image,
                  categoryId: categoryId,
                  userId: me?.data?.data?.id,
                  pageTitle: pageTitle,
                  metaDescription: metaDescription,
                  metaKeywords: metaKeywords,
                }),
              });
              router.push("/admin/post");
            }}
          >
            <p>Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p>Slug</p>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <p>Short Description</p>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
            <p>Body</p>
            <ReactQuill
              className="admin__formQuill"
              theme="snow"
              value={body}
              onChange={setBody}
            />
            <p>Image Url</p>
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <p>Category</p>
            <select
              name="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories?.data?.data?.map((category: any, index: any) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p>Page Title</p>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              required
            />
            <p>Meta Description</p>
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              required
            />
            <p>Meta Keywords</p>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              required
            />
            <button type="submit">Add Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminPostAdd);
