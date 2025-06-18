import Image from 'next/image';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ id, name, price, image, quantity, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Image src={image} alt={name} width={80} height={80} className="rounded" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-500">${price.toFixed(2)}</p>
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => onQuantityChange(id, quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 text-xs mb-2 hover:underline"
        >
          Remove
        </button>
        <div className="font-bold">${(price * quantity).toFixed(2)}</div>
      </div>
    </div>
  );
} 