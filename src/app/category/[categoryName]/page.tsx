'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand?: string;
  category: string;
}

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const categoryName = params.categoryName.charAt(0).toUpperCase() + params.categoryName.slice(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        // Filter products by category
        const categoryProducts = data.filter((product: Product) => 
          product.category.toLowerCase() === params.categoryName.toLowerCase()
        );
        
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [params.categoryName]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link 
            href="/products"
            className="text-amber-800 hover:text-amber-900 font-medium inline-flex items-center"
          >
            ← Back to Categories
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Compare and find the best {categoryName.toLowerCase()} at the best prices
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 