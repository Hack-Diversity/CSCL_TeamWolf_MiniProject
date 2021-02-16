var express = require('express');
var router = express.Router();

// Require book controller modules
var book_controller = require('../controllers/userBookController');

/// BOOK ROUTES ///
// Only access to GET requests
// Only access to 1 POST: update book copies when user borrows and returns book
// NO ACCESS TO CREATE/DELETE BOOK

// GET catalog home page.
router.get('/', book_controller.index);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

// POST request to update (return) Book.
// This POST will increment the Book's "available" key by 1
router.post('/book/:id/return', book_controller.book_return_post);

// POST request to update (borrow) Book.
// This POST will decrement the Book's "available" key by 1
router.post('/book/:id/borrow', book_controller.book_borrow_post);

/// SEARCH ROUTE ///
// Returns a GET request that searches for partial-text in a book's title
// So if we pass {title:"diary"} all books with the word "diary" (uppercase or lowercase) in it's title will be returned

// GET request to search for a book
router.get('/search', book_controller.book_search_get);
module.exports = router;

