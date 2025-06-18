'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function CategoryPage() {
  const { category } = useParams();
  const categoryString = Array.isArray(category) ? category[0] : category;
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

        const allProducts = await response.json();
        const categoryProducts = allProducts.filter(
          (product: Product) => product.category.toLowerCase() === categoryString
        );
        setProducts(categoryProducts);
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
  }, [categoryString, status, router]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            {categoryString.charAt(0).toUpperCase() + categoryString.slice(1)}
          </h1>
          <Link
            href="/products"
            className="text-[#8B4513] hover:text-[#A0522D] font-serif transition-colors"
          >
            ← Back to All Products
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 