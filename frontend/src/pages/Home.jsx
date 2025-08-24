// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { motion } from "framer-motion";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api("/books").then(setBooks).catch((err) => console.error(err));
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      <h1 className="text-4xl font-bold text-center mb-10 text-white-950 tracking-wide">
       "Islamic Books Library"
      </h1>
      <h2 className="text-xl font-light text-center mb-10 text-white-950 tracking-wide opacity-70 hover:backdrop:">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-950 transition-all"
          >
            {/* Placeholder cover */}
            <div className="h-48 bg-gradient-to-r from-blue-950 to-blue-300 flex">
             
            </div>

            <div className="p-6 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                <p className="text-sm line-clamp-2 text-gray-300">
                  {book.description}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-yellow-400">
                  {"★".repeat(book.rating)}{" "}
                  <span className="text-gray-400">
                    {"★".repeat(5 - book.rating)}
                  </span>
                </span>
                <Link
                  to={`/books/${book.id}`}
                  className="bg-blue-950 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-300 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
