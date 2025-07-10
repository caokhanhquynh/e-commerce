import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

interface Product {
  iid: number;
  title: string;
  price: number;
  description: string;
  photo: string;
  rating: number;
  review_count: number;
}
const ProductDetail = () => {

  const { iid } = useParams() as { iid: string };
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${__API_URL__}/api/items/${iid}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [iid]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <img src={product.photo} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
