// * IMPORTS
const router = require('express').Router() // Import express router
const {
  loginUser,
  registerUser,
  verifyEmail,
  logoutUser,
  forgotPassword,
  resetPassword,
  me,
} = require('../controllers/auth.controller')
const { authenticateUser } = require('../middleware/auth.middleware')

// * ROUTES
router.post('/register', registerUser) // Register a new user
router.post('/login', loginUser) // Login a user
router.delete('/logout', authenticateUser, logoutUser) // Logout a user
router.post('/verify', verifyEmail) // Verify email
router.post('/reset-password', resetPassword) // Reset password
router.post('/forgot-password', forgotPassword) // Forgot password
router.get('/me', authenticateUser, me) // Get user details

// * EXPORTS
module.exports = router
