'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/app/components/ProductCard';
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

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        setProducts(products);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(`Failed to load products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to sign-in page
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Curated Collection of Exquisite Timepieces
          </h1>
          <p className="text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Discover our handpicked selection of luxury products, each crafted with unparalleled attention to detail
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">{category}</h2>
                {categoryProducts.length > 3 && (
                  <Link
                    href={`/products/category/${category.toLowerCase()}`}
                    className="text-[#8B4513] hover:text-[#A0522D] font-serif transition-colors"
                  >
                    See More →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 