// Require Book model and async to process multiple requests
var Book = require('../models/book');

// Home Page (index). Displays count of all documents (books)
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

// Display list of all Books.
exports.book_list = function(req, res, next) {
    // Find's a Book's title, author and small img url
    Book.find({}, 'title author image_url_s').exec(function (err, list_books) {
        if (err) { return next(err); }
        
        // sort() the books in alphabetical order and return as JSON file
        list_books.sort(function(a, b) {let textA = a.title.toUpperCase(); let textB = b.title.toUpperCase(); return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;});
        res.json({all_books: list_books});
        
        // Render book_list.pug. For testing purposes
        //res.render('book_list', { title: 'Book List', book_list: list_books });
      });
  
  };

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
    
    // Find the book by using it's id
    Book.findById(req.params.id).exec(function (err, results) {
        if (err) { return next(err); }
        if (results==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, return as a JSON file
        res.json(results);
        // Return by rendering book_detail.pug. For testing
        //res.render('book_detail', { title: results.book.title, book: results.book } );
    });

};

// Handle book update on POST (return book)
exports.book_return_post = async (req, res) => {
  try {
    // Find book by id and set it's key 'available' to const available
    const available = await Book.findById(req.params.id, 'available').exec();
    // If book found, success. increment it's available copies by 1
    Book.findByIdAndUpdate(req.params.id, { $inc: { available: 1 } }).exec();
    res.status(200).json({
      status: 'success: book returned',
      // increment the const available by 1 to show Book's available copies after returning 1 copy
      availableCopiesNow: available.available + 1
    });

    // If other error occurs (such as undefined), throw this
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      error: error.message
    });
  }
};

// Handle book update on POST (borrow book)
exports.book_borrow_post = async (req, res) => {
  try {
    // Find book by id and set it's key 'available' to const available
    const available = await Book.findById(req.params.id, 'available').exec();
    console.log(available);
    // If available copies < 0, show error
    if (available.available == 0) {
      return res.status(404).json({
        status: 'failure',
        message: `No available copies`
      });
    }

    // If available copies > 0, success. decrement it's available copies by 1
    Book.findByIdAndUpdate(req.params.id, { $inc: { available: -1 } }).exec();
    res.status(200).json({
      status: 'success: book borrowed',
      // decrement the const available by 1 to show Book's available copies after borrowing 1 copy
      availableCopiesNow: available.available - 1
    });

    // If other error occurs (such as undefined), throw this
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      error: error.message
    });
  }
};


// Handle book search on GET. Allows partial text search (doesn't have to be exact match)
exports.book_search_get = async (req, res) => {
    try {
      // Find all book's who's title contain some of the words passed by req.body.title. The $options: i specifies this
      const searchResults = await Book.find({ title: { $regex: req.body.title, $options: "i" }});
      
      // If searchResults turned up nothing, show error
      if (searchResults == "") {
        return res.status(404).json({
          status: 'failure',
          message: `Book with the words '${req.body.title}' in it's title not found`
        });
      }

      // If searchResults finds a match(es), show them
      res.status(200).json({
        status: 'success',
        titleMatches: searchResults
      });

      // If other error occurs (such as undefined), throw this
    } catch (error) {
      res.status(500).json({
        status: 'failure',
        error: error.message
      });
    }
  };
