'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ALL_PRODUCTS = [
  {
    id: '1',
    name: 'Minimalist White Tee',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'T-Shirts',
  },
  {
    id: '2',
    name: 'Classic Black Blazer',
    price: 199,
    image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=400&h=400&fit=crop',
    category: 'Blazers',
  },
  {
    id: '3',
    name: 'Premium Denim Jeans',
    price: 129,
    originalPrice: 179,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop',
    category: 'Jeans',
  },
  {
    id: '4',
    name: 'Elegant White Dress',
    price: 159,
    image: 'https://images.unsplash.com/photo-1595777707802-52d71ae4fdb1?w=400&h=400&fit=crop',
    category: 'Dresses',
  },
  {
    id: '5',
    name: 'Silk Scarf Accent',
    price: 45,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Leather Crossbody',
    price: 189,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    category: 'Bags',
  },
  {
    id: '7',
    name: 'Classic Oxford Shoes',
    price: 149,
    image: 'https://images.unsplash.com/photo-1543163521-9145f931371e?w=400&h=400&fit=crop',
    category: 'Shoes',
  },
  {
    id: '8',
    name: 'Wool Overcoat',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=400&h=400&fit=crop',
    category: 'Coats',
  },
  {
    id: '9',
    name: 'Linen Summer Shirt',
    price: 79,
    image: 'https://images.unsplash.com/photo-1570830567340-b3d4d4ee76a5?w=400&h=400&fit=crop',
    category: 'Shirts',
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const categories = Array.from(new Set(ALL_PRODUCTS.map((p) => p.category)));

  const filteredProducts = selectedCategory
    ? ALL_PRODUCTS.filter((p) => p.category === selectedCategory)
    : ALL_PRODUCTS;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-neutral-50 py-12 border-b border-neutral-200">
          <div className="container-fluid">
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-neutral-600">
              Discover our complete collection of premium fashion and lifestyle products
            </p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12">
          <div className="container-fluid">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="w-full lg:w-56 flex-shrink-0">
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                        selectedCategory === null
                          ? 'bg-amber-500 text-white'
                          : 'hover:bg-neutral-100'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-white'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-neutral-200 rounded p-2"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-4 text-neutral-600">
                  Showing {sortedProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
