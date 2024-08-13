import jwt from "jsonwebtoken";

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

export { validateToken };
