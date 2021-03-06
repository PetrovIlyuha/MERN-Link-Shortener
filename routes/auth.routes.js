const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { check, validationResult } = require('express-validator');

// /api/auth
router.post(
    '/register',
    [
      check('email', 'Invalid Email').isEmail(),
      check('password', 'Password must contain at least 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
    try {        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
        {
                errors: errors.array(),
                message: "Invalid registration data"
            })
        }
        const { email, password } = req.body;
        const candidate = await User.findOne({email});
        if (candidate){
            return res.status(400).json({message: "User with that email already exists..."});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User was created!'});

    } catch (e) {
        res.status(500).json({message: "Server is nor responding..Try again"})
    }
});
// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check("password", 'Please enter correct password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
                {
                    errors: errors.array(),
                    message: "Invalid login data provided..."
                })
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "User not found..."})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: 'Invalid Password, check your typing, please...'});
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        );

        res.json({token, userId: user.id})

    }  catch (e) {
        res.status(500).json({message: "Something went wrong, try again with correct data..."})
    }
});



module.exports = router;
