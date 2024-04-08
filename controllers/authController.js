import authService from '../services/authService.js';
import User from '../models/User.js';

const register = async (req,res) => {
    const { name, email, password } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    try {
        const newUser = await authService.register(name, email , password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const { token, user } = await authService.login(email,password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMyDetails = async (req,res) => {
    try {
        const userDetails = await authService.getMyDetails(req.user._id);
        res.status(200).json({ userDetails });
    } catch (error) {
        console.error('Error fetching user deatils:', error);
        res.status(500).json({ error: 'internal server error' });
    }
};

export default {
    register,
    login,
    getMyDetails
};