import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  discount?: number;
}

const ProductGrid: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 234,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Best Seller",
      discount: 38
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviews: 567,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Limited Time",
      discount: 33
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      rating: 4.3,
      reviews: 123,
      image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 299.99,
       rating: 4.6,
      reviews: 89,
      image: "https://images.pexels.com/photos/586768/pexels-photo-586768.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: 25
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.2,
      reviews: 456,
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Popular",
      discount: 40
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 89.99,
      rating: 4.7,
      reviews: 789,
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "New Arrival"
    },
    {
      id: 7,
      name: "Professional Camera Lens",
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.9,
      reviews: 167,
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: 25
    },
    {
      id: 8,
      name: "Smart Home Hub",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.4,
      reviews: 234,
      image: "https://images.pexels.com/photos/4315110/pexels-photo-4315110.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Smart Choice",
      discount: 28
    }
  ];

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.badge}
                  </div>
                )}
                
                {/* Discount */}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}
                
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  style={{ right: product.discount ? '3.5rem' : '0.75rem' }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(product.id)}
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