import { APIError } from "../utils/APIError.js";
import { asyncHandeler } from "../utils/asynchHandeler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { User } from "../models/user.models.js";

const UserRegister = asyncHandeler(async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    throw new APIError(401, "Credentials needed");
  }

  const usernameRegex = /^[A-Za-z0-9_@.\-$!]+$/;

  if (!usernameRegex.test(username)) {
    throw new APIError(401, "Only char, numbers, and special char are allowed");
  }

  const ExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (ExistingUser) {
    throw new APIError(401, "User already exists");
  }

  if (password !== confirmpassword) {
    throw new APIError(401, "Credentials must match");
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
    throw new APIError(401, "User Not Found");
  }

  return res.status(200).json(
    new APIResponse(201, {
      userResponse,
    })
  ); // still i can optimize the security
});

const generateTokenrefereshToken = async (UserId) => {
  try {
    const user = await User.findById(UserId);
    const generatedToken = user.generateAccessToken();
    const refereshToken = user.generateRefreshToken();

    user.refreshToken = refereshToken;
    await user.save({ validateBeforeSave: false });

    return { generatedToken, refereshToken };
  } catch (error) {
    throw new APIError(501, "Something went wrong by generating token");
  }
};

const UserLogin = asyncHandeler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new APIError(401, "Credentials are NOT PROPER");
  }

  const Existinguser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!Existinguser) {
    throw new APIError(401, "User did not exists");
  }

  const validatePassword = await Existinguser.checkUserPassword(password);

  if (!validatePassword) {
    throw new APIError(401, "Credentials are NOT PROPER");
  }

  const { generatedToken, refereshToken } = await generateTokenrefereshToken(
    Existinguser._id
  );

  if (!generatedToken || !refereshToken) {
    throw new APIError(
      501,
      "SOMETHING WENT WRONG WHILE GENERATING TOKEN SO SORRY"
    );
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const response_to_user = await User.findById(Existinguser._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("AccessToken", generatedToken, options)
    .cookie("RefreshToken", refereshToken, options)
    .json(
      new APIResponse(
        201,
        {
          response_to_user,
          refereshToken,
          generatedToken,
        },
        "User Logged In Succesfully"
      ) // still login could be optimized
    );
});

export { UserRegister, UserLogin };
