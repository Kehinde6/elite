'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  deliveryTime?: string;
  returnPolicy?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  deliveryTime = '3-5 business days',
  returnPolicy = '30 days return policy'
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h4 className="text-xl font-light mb-2 text-gray-800">{name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">${price.toLocaleString()}</span>
            <span className="text-sm font-medium text-amber-600 hover:text-amber-900 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 