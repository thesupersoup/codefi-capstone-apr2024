// * IMPORTS * //
const router = require('express').Router()
const { authenticateUser } = require('../middleware/auth.middleware')
const {
  updateUserProfile,
  uploadSingleImageToCloudinary,
  getAllUserDataById,
} = require('../controllers/user.controller')

// * ROUTES  * //
router.patch('/:id', authenticateUser, updateUserProfile)

router.post('/upload-image', authenticateUser, uploadSingleImageToCloudinary)

router.get('/', authenticateUser, getAllUserDataById)

// * EXPORTS * //
module.exports = router
