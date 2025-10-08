import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200  fill-gray-600  text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;
