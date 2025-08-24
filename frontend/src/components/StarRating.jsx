import React from "react";

export default function StarRating({ value = 0, onChange, readOnly }) {
  const rounded = Math.round((value || 0) * 2) / 2;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1" role="img" aria-label={`${value} out of 5 stars`}>
      {stars.map((s) => (
        <Star
          key={s}
          filled={rounded >= s}
          half={rounded === s - 0.5}
          onClick={() => !readOnly && onChange?.(s)}
        />
      ))}
    </div>
  );
}

function Star({ filled, half, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-2xl leading-none"
      style={{
        filter: filled || half ? "none" : "grayscale(1)",
        opacity: filled || half ? 1 : 0.5,
      }}
      aria-label="star"
    >
      ★
    </button>
  );
}
