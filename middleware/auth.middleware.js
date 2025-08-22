import { success } from "zod";
import { validateUserToken } from "../utilis/token.js";

export function authecticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next();
  }

  if (!authHeader.startsWith("Bearer")) {
    return res.status(400).json({
      success: false,
      message: "Authorization headers must start with bearer",
    });
  }

  const [_, token] = authHeader.split(" ");

  const payload = validateUserToken(token);

  req.user = payload;
  next();
}
