import { APIError } from "../utils/APIError.js";
import { asyncHandeler } from "../utils/asynchHandeler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { User } from "../models/user.models.js";

const UserRegister = asyncHandeler(async (req, res) => {

  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    throw new APIError(401, "Credentials needed");
  }

  const ExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!ExistingUser && ExistingUser !== null) {
    throw new APIError(409, "User already exists");
  }

  if (password !== confirmpassword) {
    throw new APIError(410, "Credentials must match");
  }

  const users = await User.create({
    username: username.toLowerCase(),
    password,
    email,
  });

  const userResponse = await User.findById(users?._id).select(
    "-password -refreshToken"
  );

  if (!userResponse) {
    throw new APIError(411, "User Not Found");
  }

  return res.status(200).json(
    new APIResponse(201, {
      userResponse,
    })
  );
});

export { UserRegister };
