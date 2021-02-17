var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// Specify Schema for Books from Database 

var BookSchema = new Schema(
  {
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    publication_year: {type: Number, required: false},
    publisher: {type: String, required: false},
    image_url_s: {type: String, required: false},
    image_url_m: {type: String, required: false},
    image_url_l: {type: String, required: false},
    copies: {type: Number, required: false},
    available: {type: Number, required: false}
  },{
    versionKey: false // When creating a new book, don't create a revision key (__v)
});

// Virtual for book's URL. The url will be /catalog/book/BOOK_ID
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);