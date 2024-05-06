// * IMPORTS * //
const User = require('../models/User.model')
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

// * EXPORTS * //

module.exports = {
  updateUserProfile,
  uploadSingleImageToCloudinary,
}
