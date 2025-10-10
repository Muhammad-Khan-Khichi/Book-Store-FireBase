import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

function ShowBooks() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books));
  });
  return (
<div className="bg-gray-100 min-h-screen p-8">
  <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
    Our Book Collection
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {books.map((book) => (
      <div
        key={book.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* Book Cover */}
        {book.imageURL && (
          <img
            src={book.imageURL}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Book Info */}
        <div className="p-6 flex flex-col justify-between h-48">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-1">Author: {book.author}</p>
            <p className="text-indigo-600 font-semibold text-lg">
              ${book.price}
            </p>
          </div>

          {/* Button */}
          <button className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition duration-300">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


  );
}

export default ShowBooks;
