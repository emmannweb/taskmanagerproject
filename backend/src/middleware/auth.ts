const ErrorResponse = require("../utils/errorResponse");
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/IUser";
const User = require("../models/userModel");

export interface CustomRequest extends Request {
  user?: IUser;
}

interface DecodedToken {
  id: string;
}

// check is user is authenticated
exports.isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Voce precisa fazer log in!", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Voce precisa fazer log in!", 401));
  }
};

//middleware for admin
exports.isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === "user") {
    return next(
      new ErrorResponse("Accesso recusado, voce presisar ser admin", 401)
    );
  }
  next();
};
