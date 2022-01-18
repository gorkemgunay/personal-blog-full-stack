import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import Home from "../models/Home";

const router = Router();

router.get("/", async (_req, res) => {
  const home = await Home.findOne();
  return res.send({ status: true, data: home });
});

router.post("/update", isAuth, async (req, res) => {
  const home = await Home.findOne();
  if (home) {
    await home.update({ ...req.body });
    await home.save();
    return res.send({ status: true, data: home });
  } else {
    const newHome = await Home.create({ ...req.body });
    return res.send({ status: true, data: newHome });
  }
});

export default router;
