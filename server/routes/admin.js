var express = require('express');
var router = express.Router();

// Require Book controller module
var book_controller = require('../controllers/adminBookController');

/// BOOK ROUTES ///
// Only 1 GET request: to show /admin/ homepage
// 3 POST requests: to create a book, to update a book's "copies" key and to update a book's "available" key
// 1 DELETE request: delete a book entirely

// GET admin home page.
router.get('/', book_controller.index);

// POST request for creating Book.
router.post('/book/create', book_controller.book_create_post);

// POST request to update Book stock ("copies") count.
router.post('/book/:id/updateStock', book_controller.book_update_stock_post);

// POST request to update Book "available" count.
router.post('/book/:id/updateAvailable', book_controller.book_update_available_post);

// DELETE request to delete Book.
router.delete('/book/:id/delete', book_controller.book_delete_post);

module.exports = router;