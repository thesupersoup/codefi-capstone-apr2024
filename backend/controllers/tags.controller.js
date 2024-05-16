// * IMPORTS * //
const User = require('../models/User.model')
const Tag = require('../models/Tag.model')
const { unsuccessfulRes, successfulRes } = require('../lib/utils/res')

// * CONTROLLERS * //
//  FIND TAGS BY NAME (AUTO FILL)
// Lets the users start typing to get the tag they want
const getTagsByName = async (req, res) => {
  // GET ALL TAGS FROM DB (AUTO FILL)
  const allTags = await Tag.aggregate([
    {
      $search: {
        index: 'autocomplete',
        autocomplete: {
          query: req.query.name,
          path: 'name',
          fuzzy: {
            maxEdits: 1,
          },
          tokenOrder: 'sequential',
        },
      },
    },
    {
      $project: {
        name: 1,
        _id: 1,
      },
    },
    {
      $limit: 5,
    },
  ])

  // return the tags
  return successfulRes({
    res,
    data: allTags,
  })
}

// FIND SINGLE TAG BY ID
const getTagById = async (req, res) => {
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
const createTag = async (req, res) => {
  // get the data from the request body
  const { name } = req.body

  // create a new tag
  const newTag = await Tag.create({
    name,
    users: [req.user.userId],
  })

  // get the user from the db
  const foundUser = await User.findById(req.user.userId)

  // and the new tag id to the user
  foundUser.tags.push(newTag._id)

  //save the user
  foundUser.save()

  // return the new tag
  return successfulRes({
    res,
    data: newTag,
  })
}

// UPDATE TAG BY ID
// change an existing tag
const assignUserToTag = async (req, res) => {
  // get the id from the params
  const { id } = req.params

  // get the data from the request body
  const userId = req.user.userId

  // find the tag by id
  const tag = await Tag.findById(id)
  console.log(tag)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // push the new user to the tag
  await tag.users.push(userId)

  // find the user by the id
  const foundUser = await User.findById(userId)

  // and the new tag id to the user
  await foundUser.tags.push(tag._id)

  tag.save()
  foundUser.save()

  // return the updated tag
  return successfulRes({
    res,
    data: foundUser,
  })
}

// DELETE TAG BY ID
const removeTagFromUser = async (req, res) => {
  // get the id from the params
  const { id } = req.params

  // find the tag by id
  const tag = await Tag.findById(id)
  console.log(tag)

  // check if the tag exists
  if (!tag) {
    return unsuccessfulRes({
      res,
      message: 'Tag not found',
    })
  }

  // find the user by the id
  const userId = req.user.userId

  // find the user by the id
  const foundUser = await User.findById(userId)

  // remove that tag from the tags array off the user
  foundUser.tags = foundUser.tags.filter((tagId) => tagId.toString() !== id)

  // save the user
  foundUser.save()

  // return the deleted tag
  return successfulRes({
    res,
    data: 'Tag was successfully deleted',
  })
}

// GET ALL USERS FROM A TAG
const getAllUsersFromTagById = async (req, res) => {
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
  const foundUsers = await User.find({ _id: { $in: userIds } })

  let users = []

  // for every user update the information
  for (let user of foundUsers) {
    newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      middleInitial: user.middleInitial,
      email: user.email,
      phone: user.phoneNumber,
      role: user.role,
      tags: [],
    }
    for (let tag of user.tags) {
      const foundTag = await Tag.findById(tag)
      newUser.tags.push({
        name: foundTag.name,
        id: foundTag._id,
      })
    }
    users.push(newUser)
  }

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
  assignUserToTag,
  removeTagFromUser,
  getAllUsersFromTagById,
}
