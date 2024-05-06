// * IMPORTS * //
const User = require('../models/User.model')
const { unsuccessfulRes, successfulRes } = require('../lib/utils/res')
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

// * EXPORTS * //

module.exports = {
  updateUserProfile,
}
