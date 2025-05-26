import React, { useEffect, useState } from 'react';

export default function MenuItem() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch menu items from the API
        fetch('https://localhost:7274/api/MenuItem')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                return response.json();
            })
            .then((data) => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {menuItems.map((item) => (
                <div
                    key={item.id}
                    className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200"
                >
                    <img
                        src={item.imageUrl || 'https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg'}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-orange-700 font-bold mt-2">RS. {item.price}</p>
                </div>
            ))}
        </div>
    );
}