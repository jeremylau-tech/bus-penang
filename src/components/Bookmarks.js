// Bookmarks.js
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon

const hardcodedBookmarks = [
  {
    id: "1",
    routeName: "Home",
    destination: "Queensbay Mall, Penang",
  },
  {
    id: "2",
    routeName: "School",
    destination: "Penang International Airport",
  },
  {
    id: "3",
    routeName: "Office",
    destination: "Komtar, George Town",
  }
];

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(hardcodedBookmarks);

  const toggleBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Bookmarked Routes</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} className="bg-white p-4 text-black rounded-lg shadow-md mb-4 w-full relative">
            {/* Route Name at Top Left */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{bookmark.routeName}</h3>
            </div>

            {/* Destination at Bottom Left */}
            <p className="text-gray-600 mt-4">{bookmark.destination}</p>

            {/* Heart Icon for Unbookmark at Bottom Right */}
            <FaHeart
              onClick={() => toggleBookmark(bookmark.id)}
              className="absolute bottom-4 right-4 cursor-pointer text-red-500"
              size={24}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
