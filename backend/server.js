import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./books.json";

// Load books
const loadBooks = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Save books
const saveBooks = (books) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
};



// Get books
app.get("/books", (req, res) => {
  const books = loadBooks();
  res.json(books);
});

// Get book details
app.get("/books/:id", (req, res) => {
  const books = loadBooks();
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Add review
app.post("/books/:id/reviews", (req, res) => {
  const books = loadBooks();
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const newReview = {
    id: Date.now(),
    user: req.body.user || "Anonymous",
    rating: req.body.rating,
    comment: req.body.comment,
  };

  book.reviews = book.reviews || [];
  book.reviews.push(newReview);

  saveBooks(books);
  res.json(newReview);
});

// Edit review
app.put("/books/:id/reviews/:reviewId", (req, res) => {
  const books = loadBooks();
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const review = book.reviews.find((r) => r.id == req.params.reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  review.user = req.body.user || review.user;
  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;

  saveBooks(books);
  res.json(review);
});

// Delete review
app.delete("/books/:id/reviews/:reviewId", (req, res) => {
  const books = loadBooks();
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews = book.reviews.filter((r) => r.id != req.params.reviewId);

  saveBooks(books);
  res.json({ message: "Review deleted" });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
