// routes/book.routes.js

const router = require("express").Router();
const { removeListener } = require("../app.js");
const Book = require("../models/Book.model.js"); // <== add this line before your routes

router.get("/", (req, res, next) => {
  Book.find()
    .then((allTheBooksFromDB) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved books from DB:", allTheBooksFromDB);

      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render("books/book-list.hbs", { books: allTheBooksFromDB.reverse() }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  res.render("books/new-book.hbs");
});
router.post("/create", (req, res, next) => {
  const { title, description, author, rating } = req.body;

  Book.create({ title, description, author, rating })
    .then((newBook) => {
      console.log("Book Created:", newBook);
      res.redirect("/books");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:bookId", (req, res, next) => {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((foundBook) => {
      console.log("Found Book:", foundBook);
      res.render("books/book-details.hbs", foundBook);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
