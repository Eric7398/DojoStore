import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {

    // Taking in the data of email and password to match database
    const { email, password } = req.body

    // Find the user based on the email signed in with
    const user = await User.findOne({ email })

    // if the user does exist in the system then see if the password matches and generate a Token for the user
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password.')
    }

})


// @desc  Get user profile
// @route POST /api/users/login
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = User.findById(req.user._id)

    // Returning info for the logged in user
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,



        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }

    res.send('success')
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // When registering a user we take in name, email, password
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        // Email repeat validation
        throw new Error('User already exists')
    }
    // CREATE CRUD for user by using name, email, password
    const user = await User.create({
        name,
        email,
        password,
    })

    // If user is created then...
    if (user) {
        // res.status(201) means that something was created.
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        // If registration fails
        throw new Error('Invalid user data')
    }
})


export { authUser, getUserProfile, registerUser }