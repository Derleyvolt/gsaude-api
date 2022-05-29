const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BooksSchema = new Schema ({
  name : {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model("Book", BooksSchema)
