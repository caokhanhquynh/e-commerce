import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  iid: number;
  id: number;
  title: string;
  price: number;
  rating: number;
  review_count: number;
  photo: string;
}
type User = {
  id: string;
  email: string;
  name: string;
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${__API_URL__}/api/items`);
        const data = await res.json();
        console.log("data", data)
        setProducts(data ?? []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [__API_URL__]);

  const addToCart = async (itemId: number) => {
    if (!user) {
      alert("You must be logged in to add to cart.");
      return;
    }
  
    try {
      const res = await fetch(`${__API_URL__}/api/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          iid: itemId,
        }),
      });
  
      if (!res.ok) throw new Error("Failed to add to cart");
  
      const result = await res.json();
      console.log("Added to cart:", result.data);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Error adding to cart.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return;
      }
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
      });
    } catch (error) {
      console.error('Error parsing token:', error);
      // Clear invalid token
      localStorage.removeItem('token');
    }
  };
  

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of trending products with unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.iid}
              onClick={() => navigate(`/product/${product.iid}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${product.photo}`} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                  {product.title}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.review_count})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(product.iid)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;