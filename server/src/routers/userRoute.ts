import { Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isAuth from "../middlewares/isAuth";
import Post from "../models/Post";

const router = Router();

router.get("/", isAuth, async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });
  return res.send({ status: true, data: users });
});

router.get("/me", isAuth, async (req, res) => {
  const token = req.cookies.uid;

  if (token) {
    const verifyToken: any = jwt.verify(token, "secretkey");

    const id = verifyToken.uid;

    const user: any = await User.findOne({
      where: { id: id },
      attributes: ["id", "email", "name", "surname", "createdAt", "updatedAt"],
      include: Post,
    });

    return res.send({
      status: true,
      message: "success",
      data: user,
    });
  }
  return res.send({ status: false, message: "error" });
});

router.get("/logout", isAuth, async (_req, res) => {
  res.cookie("uid", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  return res.send({ status: true, message: "successfully logout" });
});

router.post("/register", async (req, res) => {
  const { email, name, surname, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    if (password.length > 5) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        name,
        surname,
        password: hashedPassword,
      });

      return res.send({ status: true, message: "successfully register" });
    }
    return res.send({
      status: false,
      message: "password must be at least 6 character",
    });
  }

  return res.send({ status: false, message: "email is already exist" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ where: { email: email } });
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      const token = jwt.sign(
        {
          uid: user.id,
        },
        "secretkey",
        {
          expiresIn: "1d",
        }
      );

      res.cookie("uid", token, {
        httpOnly: true,
        secure: false,
      });

      return res.send({ status: true, message: "successfully login" });
    }

    return res.send({ status: false, message: "invalid credentials" });
  }

  return res.send({ status: false, message: "invalid credentials" });
});

export default router;
