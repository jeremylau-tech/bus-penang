import React, { useState } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (location) => {
    setBookmarks([...bookmarks, location]);
  };

  return (
    <div>
      <h2>Your Bookmarked Locations</h2>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>{bookmark}</li>
        ))}
      </ul>
      <button onClick={() => addBookmark("New Location")}>Add Bookmark</button>
    </div>
  );
};

export default Bookmarks;
