// * IMPORTS * //
const router = require('express').Router()
const {
  getTagsByName,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
  getAllUsersFromTagById,
} = require('../controllers/tags.controller')
const { authenticateUser } = require('../middleware/auth.middleware')

// * ROUTES  * //
router.get('/', getTagsByName)
router.get('/:id', getTagById)
router.post('/', authenticateUser, createTag)
router.patch('/:id', authenticateUser, updateTagById)
router.delete('/:id', authenticateUser, deleteTagById)
router.get('/users/:id', getAllUsersFromTagById)

// * EXPORTS * //
module.exports = router
