// * IMPORTS * //
const { mongoose } = require('mongoose')
const Schema = mongoose.Schema

// * MODELS * //
const tagModel = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    unique: true,
  },
  // tie users to the tags model
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

// * EXPORTS * //
module.exports = mongoose.model('Tag', tagModel)
