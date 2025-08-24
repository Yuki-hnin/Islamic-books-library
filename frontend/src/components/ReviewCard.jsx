export default function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <div className="bg-gray-700 p-4 rounded-xl mb-4 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{review.user}</h3>
        <p className="text-yellow-300">⭐ {review.rating}</p>
      </div>
      <p className="text-gray-300 mt-2">{review.comment}</p>
      <div className="flex gap-2 mt-3 text-sm">
        <button 
          onClick={onEdit} 
          className="px-3 py-1 bg-blue-950 hover:bg-blue-500 rounded-lg"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          className="px-3 py-1 bg-blue-950 hover:bg-blue-500 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
