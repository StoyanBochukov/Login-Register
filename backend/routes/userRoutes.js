const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateUserProfile } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/profile', protect, updateUserProfile)

module.exports = router
