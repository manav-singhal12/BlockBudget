import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

import { User } from '../models/user.model.js'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validationBeforeSave: false })
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "something went wrong")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password, walletKey } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }]
    })
    if (existingUser) {
        return new ApiError(400, "Username already exists")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    const user = await User.create({
        username, fullname, email, password, avatar: avatar.url, walletKey
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong");
    }
    return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser))
})

const loginUser = asyncHandler(async (req, res) => {
    // console.log("Login request received"); 
    const { username, password } = req.body;
    const user = await User.findOne({
        $or: [{ username }]
    })
    if (!user) {
        return new ApiError(401, "Invalid username or password");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return new ApiError(401, "Invalid password");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        secureProtocol: 'TLSv1_2_method',
    }

    return res.status(200).cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options).json(
        new ApiResponse(200, {
            user: loggedInUser,
            accessToken, refreshToken
        }, "User logged in successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {

    const user = User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        }
        //or
        // $unset:{
        //     refreshToken:1
        // }
    }, {
        new: true
    }
    )
    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        secureProtocol: 'TLSv1_2_method'
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshTPoken", options).json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullname, email, password, newPassword, walletKey } = req.body;

    const user = User.findById(req.user_.id);

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "old password is wrong ! ")
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)

    let updateData = {
        email: req.body?.email || user.email,
        password: hashedPassword || user.password,
        fullname: req.body?.fullname || user.fullname,
      };

    if (walletKey) {
        updateData.walletKey = { $push: { $each: walletKey } }; // Append new walletKeys to the existing array
    }

    // Update user profile with the new data
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: updateData,
    });
    return res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"))
})


export { registerUser, loginUser, logoutUser,updateProfile };