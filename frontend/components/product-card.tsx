'use client';

import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-neutral-100 mb-4">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100 transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-500 mb-1">{category}</p>
        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">{name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-neutral-900">${price}</span>
          {originalPrice && (
            <span className="text-sm text-neutral-400 line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
