'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart, useWishlist, useToast } from '@/lib/hooks';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

export default function ProductCard(product: Product) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isFavorite = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      quantity: 1,
      selectedColor: product.colors[0]?.name,
      selectedSize: product.sizes[0]?.value,
    });
    addToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product.id);
    addToast('Added to wishlist!', 'success');
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className="group cursor-pointer h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg bg-neutral-100 mb-4 h-72">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}

          {product.stockCount > 0 && product.stockCount < 10 && (
            <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Only {product.stockCount} left!
            </div>
          )}

          {/* Overlay with actions */}
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} />
            </motion.button>
            <motion.button
              onClick={handleAddToWishlist}
              className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                size={20}
                fill={isFavorite ? 'currentColor' : 'none'}
                color={isFavorite ? 'red' : 'currentColor'}
              />
            </motion.button>
          </motion.div>
        </div>

        <div>
          <p className="text-xs text-neutral-500 mb-1 uppercase tracking-wide">{product.category}</p>
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-neutral-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-neutral-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
