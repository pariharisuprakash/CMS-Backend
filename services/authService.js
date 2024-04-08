import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (name , email, password) => {
    try {
        if (!name || !email || !password) {
            throw new Error('Please enter all the required fields..');
        }
         if (name.length >25) {
            throw new Error('Name can only be less than 25 characters..');
         }
         const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (!emailReg.test(email)) {
            throw new Error('Please enter a valid email address.');
        }
        if (password.length <=6 ) {
            throw new Error('Password must be at least six characters..');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error(`a user with email ${email} already exists.`);
        }
        const hashedPassword = await bcrypt.hash(password,12);

        const newUser = new User({ name, email, password: hashedPassword});

        const result = await newUser.save();

        result._doc.password = undefined;

        return res.status(201).json({...result._doc });
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
};

const login = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Please enter all the required fields.');
        }
        const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(email)) {
            throw new Error('Please enter a valid email address.');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid user or Password..');
        }
        const payload = { _id: doesUserExits._id };
        const token = jwt.sign({ userId: user._id},payload, process.env.JWT_SECRET, {expiresIn: "1h"});

        user.password = undefined;
        return { token, user};
    } catch (error) {
        throw new Error(error.message);
    }
};

const getMyDetails = async (userId) => {
    try {
        const userDetails = await User.findById(userId).select('-password');
        if (!userDetails) {
            throw new Error('User not found..');
        }
        return userDetails;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    register,
    login,
    getMyDetails
};

