// * IMPORTS * //
const router = require('express').Router()
const {
  getTagsByName,
  getTagById,
  createTag,
  assignUserToTag,
  removeTagFromUser,
  getAllUsersFromTagById,
} = require('../controllers/tags.controller')
const { authenticateUser } = require('../middleware/auth.middleware')

// * ROUTES  * //
router.get('/', getTagsByName)
router.get('/:id', getTagById)
router.post('/', authenticateUser, createTag)
router.patch('/:id', authenticateUser, assignUserToTag)
router.delete('/:id', authenticateUser, removeTagFromUser)
router.get('/users/:id', getAllUsersFromTagById)

// * EXPORTS * //
module.exports = router
