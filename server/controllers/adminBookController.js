// Require Book model and async to process multiple requests
var Book = require('../models/book');

// Admin Home Page (index). Displays count of all documents (books)
exports.index = function(req, res) {
    // Pass an empty object as match condition to find all documents of this collection
    Book.countDocuments({}).exec(function (err, results) { 
        if (err) { return next(err); }
      // Return as JSON file
      res.json({total_books: results});
      // Render index.pug. For testing purposes
      //res.render('index', { title: 'Home', error: err, data: results });
  });
};

exports.book_create_post = (req, res, next) => {
    // Set variables from passed JSON file
    const title = req.body.title;
    const author = req.body.author;
    const isbn = req.body.isbn;
    const publisher = req.body.publisher;
    const publication_year = req.body.publication_year;
    const image_url_s = req.body.image_url_s;
    const image_url_m = req.body.image_url_m;
    const image_url_l = req.body.image_url_l;
    const copies = req.body.copies;
    const available = req.body.available;
        // Create a Book object from constants above
        var newBook = new Book({ 
            title,
            author,
            isbn,
            publisher,
            publication_year,
            image_url_s,
            image_url_m,
            image_url_l,
            copies,
            available
           });

            // Save book
            newBook.save()
            .then(() => res.json('Book created!'))
            .catch(err => res.status(400).json('Error: ' + err));
};


// Update a book's stock count ("copies")
exports.book_update_stock_post = (req, res, next) => {
    // Find book by ID, then replace it's copies key by what's sent in JSON file
    Book.findById(req.params.id)
    .then(book => {
      book.copies = req.body.copies;
      // If no errors, save book and show JSON message showing success
      book.save()
        .then(() => res.json('Book copies updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

// Update a book's available count ("available")
exports.book_update_available_post = (req, res, next) => {
    // Find book by ID, then replace it's available key by what's sent in JSON file
    Book.findById(req.params.id)
    .then(book => {
      book.available = req.body.available;
      // If no errors, save book and show JSON message showing success
      book.save()
        .then(() => res.json('Book available updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.book_delete_post = (req, res, next) => {
    // Find book by ID. If successful, delete it
    Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
};
