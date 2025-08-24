import React from "react";
import StarRating from "./StarRating";

export default function BookCard({ book, onClick }) {
  return (
    <div
      className="card p-4 hover:shadow-xl transition cursor-pointer"
      onClick={onClick}
    >
      {/* Cover Image */}
      <div
        className="rounded-xl border border-zinc-800 overflow-hidden"
        style={{ aspectRatio: "3 / 4", width: "100%" }}
      >
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/covers/placeholder.jpg"; // fallback if missing
          }}
        />
      </div>

      {/* Book Title */}
      <h3 className="mt-4 text-lg font-semibold">{book.title}</h3>
      <p className="text-muted text-sm">{book.author}</p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2">
        <StarRating value={book.rating} readOnly />
        <span className="text-muted text-sm">
          {Number(book.rating).toFixed(1)}
        </span>
      </div>
    </div>
  );
}
