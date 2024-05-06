// * IMPORTS * //
const router = require('express').Router()
const { authenticateUser } = require('../middleware/auth.middleware')
const {
  updateUserProfile,
  uploadSingleImageToCloudinary,
} = require('../controllers/user.controller')

// * ROUTES  * //
router.patch('/:id', authenticateUser, updateUserProfile)

router.post('/upload-image', authenticateUser, uploadSingleImageToCloudinary)

// * EXPORTS * //
module.exports = router
