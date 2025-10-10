import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

function ShowBooks() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await firebase.listAllBooks();
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  },[]);

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

   return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
        Our Book Collection
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {book.imageURL && (
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
              )}
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
                <button className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowBooks;
