// * IMPORTS * //
const User = require('../models/User.model')
const Tag = require('../models/Tag.model')
const { unsuccessfulRes, successfulRes } = require('../lib/utils/res')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

// * CONTROLLERS * //
const updateUserProfile = async (req, res) => {
  // get data from request body
  const info = req.body

  if (!info) {
    return unsuccessfulRes({
      res,
      message: 'No info provided',
    })
  }

  // find the user by id
  const user = await User.findByIdAndUpdate(req.user.userId, info, {
    new: true,
  })

  // return the updated user
  return successfulRes({
    res,
    data: user,
  })
}

// Upload profile logo
const uploadSingleImageToCloudinary = async (req, res) => {
  // if no file found, return error
  if (!req.files.img.tempFilePath) {
    return unsuccessfulRes({ res, data: { msg: 'no file found' } })
  }
  const result = await cloudinary.uploader.upload(req.files.img.tempFilePath, {
    use_filename: true,
    folder: 'profile_pictures',
  })

  fs.unlinkSync(req.files.img.tempFilePath)

  // send success message
  successfulRes({ res, data: { src: result.secure_url } })
}

// Get All User Profile Data
const getAllUserDataById = async (req, res) => {
  // get the user id from the req user
  const userId = req.user.userId

  // find the user by id
  const user = await User.findById(userId)

  // check if the user exists
  if (!user) {
    return unsuccessfulRes({
      res,
      message: 'User not found',
    })
  }

  // get all the tag names
  let tags = []
  for (let tag of user.tags) {
    const foundTag = await Tag.findById(tag)
    console.log(foundTag)

    tags.push(foundTag.name)
  }

  // return the users data
  return successfulRes({
    res,
    data: {
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePic,
      tags: tags,
    },
  })
}

// * EXPORTS * //

module.exports = {
  updateUserProfile,
  uploadSingleImageToCloudinary,
  getAllUserDataById,
}
