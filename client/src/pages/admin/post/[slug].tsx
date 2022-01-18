import type { NextPage } from "next";
import { useRouter } from "next/router";
import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import useSWR from "swr";
import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import withAuth from "../../../HOC/withAuth";

const AdminPostEdit: NextPage = () => {
  const router = useRouter();
  const slugParam = router.query.slug;

  const post: any = useSWR(
    `http://localhost:4000/post/${slugParam}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const me: any = useSWR("http://localhost:4000/user/me", (...args) =>
    fetch(...args, { credentials: "include" }).then((res) => res.json())
  );

  const categories: any = useSWR(`http://localhost:4000/category`, (...args) =>
    fetch(...args).then((res) => res.json())
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  useEffect(() => {
    if (post?.data?.data) {
      setTitle(post?.data?.data?.title);
      setSlug(post?.data?.data?.slug);
      setShortDescription(post?.data?.data?.shortDescription);
      setBody(post?.data?.data?.body);
      setCategoryId(post?.data?.data?.categoryId);
      setImage(post?.data?.data?.image);
      setPageTitle(post?.data?.data?.pageTitle);
      setMetaDescription(post?.data?.data?.metaDescription);
      setMetaKeywords(post?.data?.data?.metaKeywords);
    }
  }, [post?.data?.data]);
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__body">
        <Navbar />
        <div className="admin__bodyContent">
          <div className="admin__bodyHeader">
            <h2 className="admin__bodyTitle">Post Edit</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                fetch(`http://localhost:4000/post/delete/${slugParam}`, {
                  credentials: "include",
                });
                router.push("/admin/post");
              }}
              className="admin__bodyButton"
            >
              Delete Post
            </button>
          </div>
          <form
            className="admin__bodyForm"
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`http://localhost:4000/post/update/${slugParam}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: title,
                  slug: slug,
                  shortDescription: shortDescription,
                  body: body,
                  categoryId: categoryId,
                  userId: me?.data?.data?.id,
                  image: image,
                  pageTitle: pageTitle,
                  metaDescription: metaDescription,
                  metaKeywords: metaKeywords,
                }),
                credentials: "include",
              });
              router.push("/admin/post");
            }}
          >
            <p>Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>Slug</p>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <p>Short Description</p>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <p>Body</p>
            <ReactQuill
              className="admin__formQuill"
              theme="snow"
              value={body}
              onChange={setBody}
            />
            <p>Category</p>
            <select
              name="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories?.data?.data?.map((category: any, index: any) => (
                <option
                  key={index}
                  selected={category.id === categoryId}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <p>Image Url</p>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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

export default withAuth(AdminPostEdit);
