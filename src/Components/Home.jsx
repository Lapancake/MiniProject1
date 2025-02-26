import React, { useState } from 'react';

const Home = () => {
  
  const items = [
    { id: 1, name: 'Item 1', details: 'This is Item 1' },
    { id: 2, name: 'Item 2', details: 'And this is your Second Item' },
    { id: 3, name: 'Item 3', details: 'Get ready for Item 3!' },
  ];

  
  const [hoveredItem, setHoveredItem] = useState(null);

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
                className="p-2 cursor-pointer hover:bg-blue-200 rounded"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Item Details */}
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          {hoveredItem ? (
            <p>{hoveredItem.details}</p>
          ) : (
            <p className="text-gray-500">If you hover over the Item, you can see info about the item.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
