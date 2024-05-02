// * IMPORTS * //
const User = require('../models/User.model')
const Tag = require('../models/Tag.model')

// * CONTROLLERS * //
// ang
// angular tag id

// TODO: FIND TAGS BY NAME (AUTO FILL)
// Lets the users start typing to get the tag they want
const getTagsByName = async () => {
  // get the name from the query params
  const { name } = req.query
}

// FIND SINGLE TAG BY ID
const getTagById = async () => {
  // get the id from the params
  const { id } = req.params

  // find the tag by id
  const tag = await Tag.findById(id)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // return the tag
  return successfulRes({
    res,
    data: tag,
  })
}

// CREATE TAG
const createTag = async () => {
  // get the data from the request body
  const info = req.body

  // create a new tag
  const newTag = await Tag.create({
    info,
  })

  // return the new tag
  return successfulRes({
    res,
    data: newTag,
  })
}

// UPDATE TAG BY ID
// change an existing tag
const updateTagById = async () => {
  // get the id from the params
  const { id } = req.params

  // get the data from the request body
  const info = req.body

  // find the tag by id
  const tag = await Tag.findById(id)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // update the tag
  const updatedTag = await Tag.findByIdAndUpdate(id, info, {
    new: true,
  })

  // return the updated tag
  return successfulRes({
    res,
    data: updatedTag,
  })
}

// DELETE TAG BY ID
const deleteTagById = async () => {
  // get the id from the params
  const { id } = req.params

  // find the tag by id
  const tag = await Tag.findById(id)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // delete the tag
  await Tag.findByIdAndDelete(id)

  // return the deleted tag
  return successfulRes({
    res,
    data: 'Tag was successfully deleted',
  })
}

// GET ALL USERS FROM A TAG
// ! NEED TO TEST
const getAllUsersFromTagById = async () => {
  // get the id from the params
  const { id } = req.params

  // find the tag by id
  const tag = await Tag.findById(id)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // get all the user ids from the tag
  const userIds = tag.users

  // get all the users from the user ids
  const users = await User.find({ _id: { $in: userIds } })

  // return the users
  return successfulRes({
    res,
    data: users,
  })
}

// * EXPORTS * //

module.exports = {
  getTagsByName,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
  getAllUsersFromTagById,
}
