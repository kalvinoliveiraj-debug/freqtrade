'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useWishlist } from '@/lib/hooks';
import { ALL_PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/product-card';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = wishlist.map((id) => ALL_PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-fluid text-center">
            <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
            <p className="text-neutral-600 mb-8">Your wishlist is empty</p>
            <Link href="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-8">My Wishlist ({wishlistProducts.length})</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) =>
              product ? <ProductCard key={product.id} {...product} /> : null
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
