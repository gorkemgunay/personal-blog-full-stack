import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import Category from "../models/Category";
import Post from "../models/Post";

const router = Router();

router.get("/", async (_req, res) => {
  const categories = await Category.findAll({
    include: Post,
    order: [["createdAt", "DESC"]],
  });
  return res.send({ status: true, data: categories });
});

router.get("/:id", async (req, res) => {
  const { id }: any = req.params;
  const category = await Category.findOne({ where: { id: id }, include: Post });
  return res.send({ status: true, data: category });
});

router.post("/add", isAuth, async (req, res) => {
  const category = await Category.create({ ...req.body });
  return res.send({ status: true, data: category });
});

router.post("/update/:id", isAuth, async (req, res) => {
  const { id }: any = req.params;
  const category = await Category.findOne({ where: { id: id } });
  if (category) {
    await category.update({ ...req.body });
    await category.save();
    return res.send({ status: true, data: category });
  }

  return res.send({ status: false, message: "Category not found" });
});

router.get("/delete/:id", isAuth, async (req, res) => {
  const { id }: any = req.params;
  await Category.destroy({ where: { id: id } });
  return res.send({ status: true, data: true });
});

export default router;
