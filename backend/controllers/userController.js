const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const { use } = require('../routes/userRoutes.js')


//Generate Token
const generateToken = (id, firstName) => {
    return jwt.sign({ id, firstName }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

//Register a new User
//route /api/users
//access public
const registerUser = asyncHandler( async(req, res) => {
    const { firstName, lastName, DoB, country, email, password, image, position } = req.body

    //Validation
    if(!firstName || !lastName || !email || !DoB || !country || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }
    //If user already exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        firstName,
        lastName,
        DoB,
        country,
        email,
        password: hashedPassword,
        position,
        image
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            DoB: user.DoB,
            country: user.country,
            email: user.email,
            position:user.position,
            image: user.image,
            token: generateToken(user._id, user.firstName)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//Login user
//route /api/users/login
//access private

const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    //Check user and password
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            DoB: user.DoB,
            country: user.country,
            position: user.position,
            email: user.email,
            image: user.image,
            token: generateToken(user._id, user.firstName)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

//@desc Get current user
//@route /api/users/me
//@access private/protecter route
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        position: req.user.position,
        email: req.user.email,
        image: req.use.image
    }
    res.status(200).json(user)
})

const updateUserProfile = asyncHandler( async(req, res) =>{
    const user = await User.findById(req.user._id)
    if(user){
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.DoB = req.body.DoB || user.DoB
        user.country = req.body.country || user.country
        user.position = req.body.position || user.position
        if(req.body.email){
            user.email = req.body.email
        }
        if(req.body.password){
            user.password = req.body.password
        }
        if(req.body.image){
            user.image = req.body.image
        }

        const updatedUser = await user.save()
       
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            position: updatedUser.position,
            email: updatedUser.email,
            password: updatedUser.password,
            image: updatedUser.image,
            token: generateToken(updatedUser._id, updatedUser.firstName)

        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUserProfile
}
