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

// * ROUTES  * //
router.get('/', getTagsByName)
router.get('/:id', getTagById)
router.post('/', createTag)
router.patch('/:id', updateTagById)
router.delete('/:id', deleteTagById)
router.get('/users/:id', getAllUsersFromTagById)

// * EXPORTS * //
module.exports = router
