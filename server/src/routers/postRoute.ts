import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import Category from "../models/Category";
import Post from "../models/Post";
import User from "../models/User";

const router = Router();

router.get("/", async (_req, res) => {
  const posts = await Post.findAll({
    include: [Category, { model: User, attributes: ["name", "surname"] }],
    order: [["createdAt", "DESC"]],
  });
  return res.send({ status: true, data: posts });
});

router.get("/:slug", async (req, res) => {
  const { slug }: any = req.params;
  if (slug) {
    const post = await Post.findOne({
      where: { slug: slug },
      include: [Category, { model: User, attributes: ["name", "surname"] }],
    });

    if (post) {
      return res.send({ status: true, data: post });
    }
  }
  return res.send({ status: false, message: "post not found" });
});

router.post("/add", isAuth, async (req: any, res) => {
  const post = await Post.create({ ...req.body });
  return res.send({ status: true, data: post });
});

router.post("/update/:slug", isAuth, async (req, res) => {
  const { slug }: any = req.params;
  const post = await Post.findOne({ where: { slug: slug } });
  if (post) {
    if (req.body.categoryId) {
      const category = await Category.findOne({
        where: { id: req.body.categoryId },
      });

      await post.update({ ...req.body, category });
      await post.save();
      return res.send({ status: true, data: post });
    }
    await post.update({ ...req.body });
    await post.save();
    return res.send({ status: true, data: post });
  }

  return res.send({ status: false, message: "post not found" });
});

router.get("/delete/:slug", isAuth, async (req, res) => {
  const { slug }: any = req.params;
  await Post.destroy({ where: { slug: slug } });
  return res.send({ status: true, data: true });
});

export default router;
