// src/pages/BookDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, apiRaw } from "../api.js";
import { motion } from "framer-motion";
import { Star, ArrowLeft, Trash2, Edit3 } from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  // Fetch book details
  useEffect(() => {
    api(`/books/${id}`)
      .then(setBook)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const addReview = async () => {
    if (!newReview.user || !newReview.comment) return alert("Fill all fields!");
    const review = await apiRaw(`/books/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
    setBook({ ...book, reviews: [...book.reviews, review] });
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  const deleteReview = async (reviewId) => {
    await apiRaw(`/books/${id}/reviews/${reviewId}`, { method: "DELETE" });
    setBook({ ...book, reviews: book.reviews.filter((r) => r.id !== reviewId) });
  };

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  if (!book) return <p className="text-center text-red-500 mt-10">Book not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Book Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto"
      >
        {/* Cover Image */}
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 flex items-center justify-center bg-gray-700">
            <span className="text-gray-400 italic">No Cover</span>
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-400 mb-3">by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                size={20}
                className={
                  idx < book.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6">{book.description}</p>

          {/* Reviews Section */}
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {book.reviews.length > 0 ? (
              book.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-700 rounded-xl p-4 shadow-md flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className={
                            idx < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-500"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>

          {/* Add Review */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
            <input
              type="text"
              placeholder="Your name"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 mb-2"
            />
            <textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 mb-2"
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="p-2 rounded-lg bg-gray-700 text-gray-100 mb-2"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <button
              onClick={addReview}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg"
            >
              Submit Review
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
