import { APIError } from "../utils/APIError.js";
import { asyncHandeler } from "../utils/asynchHandeler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const VerifyJWT = asyncHandeler(async (req, __dirname, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new APIError(401, "Token Not Found");
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodeToken?._id).select(
      "-password, -refreshToken"
    );

    if (!user) {
      throw new APIError(401, "UNAUTORIZED ACCESS");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid access token");
  }
});

export { VerifyJWT };
