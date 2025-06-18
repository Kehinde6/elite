import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/products/${id}`}>
        <div className="relative h-80">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{name}</h3>
          <p className="text-[#8B4513] font-serif text-xl">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </Link>
    </div>
  );
} 