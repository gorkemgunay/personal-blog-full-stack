import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./utility/db";
import homeRoute from "./routers/homeRoute";
import postRoute from "./routers/postRoute";
import categoryRoute from "./routers/categoryRoute";
import userRoute from "./routers/userRoute";
import Category from "./models/Category";
import Post from "./models/Post";
import User from "./models/User";

(async () => {
  Category.hasMany(Post);
  Post.belongsTo(Category);
  User.hasMany(Post);
  Post.belongsTo(User);

  await db.sync();

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use("/image", express.static("src/public/images"));

  app.use("/home", homeRoute);
  app.use("/post", postRoute);
  app.use("/category", categoryRoute);
  app.use("/user", userRoute);

  app.listen(4000, () => console.log("server started at port 4000"));
})();
