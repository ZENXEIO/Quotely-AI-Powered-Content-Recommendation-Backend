import APIError from "../utils/APIError";
import asynchHandeler from "../utils/asynchHandeler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export const verifyJWT = asynchHandeler(async(req, res, next)=>{
  
    const token = req.cookies?.accessToken || req.header('Authorization').replace("Bearer ", "").trim();

    if(!token){
        throw new APIError(401, 'Unauthorized access');
    };

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const usercreation = await User.findById(decodedToken?._id).select('-password');

    if(!usercreation){
        throw new APIError(401, 'Invalid token');
    }

    req.user = usercreation
    next();

})