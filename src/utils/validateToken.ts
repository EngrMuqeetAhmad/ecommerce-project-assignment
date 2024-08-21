import jwt from "jsonwebtoken";
import { Role } from "../types/userTypes";

function validateToken(req: any, res: any, next: any) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token.split(" ")[1], "MuqeetAhmad", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

function authorizeRole(roles: Array<Role>) {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req?.user?.role)) {
      res.status(403).json({ message: "UnAuthorized" });
      return;
    }
    next();
  };
}

export { validateToken, authorizeRole };
