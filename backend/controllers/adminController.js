import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// @desc    Auth admin/set token
//route     POST /api/admin/auth
//@access   Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id,'adminJwt');

        res.status(201).json({
            _id: admin._id,
            email: admin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Logout admin
//route     POST /api/admin/logout
//@access   Public
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('adminJwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Admin logged out' });
});


// @desc    User data
//route     GET /api/admin/users
//@access   Private
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find({}).select('-password');
    res.json({ user });
});


// @desc    Add new user 
//route     POST /api/admin/users/add
//@access   Private
const addUsers = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc    Get user Profile
//route     GET /api/admin/users/update
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.query.id;
    const user = await User.findById(userId).select('-password');
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error('User not found');
    }
});


// @desc    Update user Profile
//route     PUT /api/admin/users/update
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        const response = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        };

        res.status(200).json(response);

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Delete user
//route     DELETE /api/admin/users/delete
//@access   Private
const deleteUsers = asyncHandler(async (req, res) => {
    const userId = req.query.id;

    if (!userId) {
        res.status(400);
        throw new Error("Invalid user Data");
    }

    const deletedUser = await User.findByIdAndRemove(userId);

    if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error("Invalid user Data");
    }
});



export {
    authAdmin, logoutAdmin, getUsers, addUsers,
    getUserProfile, updateUserProfile, deleteUsers
};