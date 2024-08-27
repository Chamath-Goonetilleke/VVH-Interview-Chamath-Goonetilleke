import jsonwebtoken from "jsonwebtoken";


export default function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token.");

  try {
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
