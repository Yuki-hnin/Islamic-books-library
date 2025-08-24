import { useState, useEffect } from "react";

export default function ReviewModal({ isOpen, onClose, onSave, existingReview }) {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (existingReview) {
      setUser(existingReview.user);
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    } else {
      setUser("");
      setRating(5);
      setComment("");
    }
  }, [existingReview]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {existingReview ? "Edit Review" : "Add Review"}
        </h2>
        
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave({ user, rating, comment })} 
            className="px-3 py-1 bg-blue-950 hover:bg-blue-700 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
