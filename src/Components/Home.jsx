import React, { useEffect, useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetch('https://your-vercel-project-url/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://your-vercel-project-url/api/items/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - List of Items */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Items List</h2>
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="p-2 cursor-pointer hover:bg-blue-200 rounded flex justify-between"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{item.name}</span>
                {isAdmin && (
                  <div className="space-x-2">
                    <button
                      className="text-sm text-blue-600 underline"
                      onClick={() => alert('Implement update UI')}
                    >
                      Update
                    </button>
                    <button
                      className="text-sm text-red-600 underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => alert('Implement add item UI')}
            >
              Add Item
            </button>
          )}
        </div>

        {/* Right Column - Item Details */}
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          {hoveredItem ? (
            <p>{hoveredItem.details}</p>
          ) : (
            <p className="text-gray-500">Hover over an item to see more details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
