// * IMPORTS * //
const router = require('express').Router()
const { authenticateUser } = require('../middleware/auth.middleware')
const { updateUserProfile } = require('../controllers/user.controller')

// * ROUTES  * //
router.patch('/:id', authenticateUser, updateUserProfile)

// * EXPORTS * //
module.exports = router
