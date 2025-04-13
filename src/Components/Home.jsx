import React, { useEffect, useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  
  const isAdmin = true; 

  
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.description) {
      alert('Both fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (res.ok) {
        setNewItem({ title: '', description: '' });
        fetchItems(); 
      } else {
        alert('Failed to add item.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/items/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchItems();
      } else {
        alert('Delete failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItem = async (id) => {
    const updatedTitle = prompt('Enter new title:');
    const updatedDescription = prompt('Enter new description:');

    if (!updatedTitle || !updatedDescription) return;

    try {
      const res = await fetch(`http://localhost:3001/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, description: updatedDescription })
      });

      if (res.ok) {
        fetchItems();
      } else {
        alert('Update failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Left Column - List */}
      <div className="w-1/2 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        <ul>
          {items.map(item => (
            <li
              key={item.id}
              className="p-2 border-b hover:bg-blue-100 cursor-pointer flex justify-between items-center"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span>{item.title}</span>
              {isAdmin && (
                <div className="space-x-2">
                  <button onClick={() => handleUpdateItem(item.id)} className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Admin add item form */}
        {isAdmin && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Add New Item</h3>
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              className="block mb-2 p-2 border w-full rounded"
            />
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
              className="block mb-2 p-2 border w-full rounded"
            />
            <button
              onClick={handleAddItem}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Item
            </button>
          </div>
        )}
      </div>

      {/* Right Column - Details */}
      <div className="w-1/2 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Item Details</h2>
        {hoveredItem ? (
          <div>
            <h3 className="text-lg font-bold">{hoveredItem.title}</h3>
            <p className="mt-2 text-gray-700">{hoveredItem.description}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Hover over an item to see details</p>
        )}
      </div>
    </div>
  );
};

export default Home;
