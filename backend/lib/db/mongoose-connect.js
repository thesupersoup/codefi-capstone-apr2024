// * IMPORTS
const mongoose = require('mongoose')

// * METHODS
function connectToMongo(dbConnectionString) {
  // Try to connect to the Mongo Database
  try {
    const dbConnection = mongoose.connect(dbConnectionString) // Connect to the Mongo Database

    // Log the name of the Mongo Database
    console.log(`Connected to the Mongo Database`)

    return dbConnection // Return the connection
  } catch (err) {
    console.log('ERROR CONNECTING TO DB:', err) // Log the error
  }
}

// * EXPORTS
module.exports = connectToMongo
