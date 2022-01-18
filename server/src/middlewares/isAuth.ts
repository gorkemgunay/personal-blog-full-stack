import jwt from "jsonwebtoken";

const isAuth = (req: any, res: any, next: () => void) => {
  try {
    const token = req.cookies.uid;

    if (token) {
      const verifyToken: any = jwt.verify(token, "secretkey");

      req.uid = verifyToken.uid;

      return next();
    }

    return res.send({ status: false, message: "not a valid token" });
  } catch (_) {
    return res.send({ status: false, message: "not authenticated" });
  }
};

export default isAuth;
