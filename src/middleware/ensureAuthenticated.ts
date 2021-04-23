import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/authConfig";
import { AppError } from "../error/error";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decod = verify(token, authConfig.jwt.secretKey);

    const { sub } = decod as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT Token", 401);
  }
}
