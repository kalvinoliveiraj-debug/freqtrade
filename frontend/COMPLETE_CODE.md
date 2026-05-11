# Complete CKM Studio App - All Code Files

This file contains ALL remaining code you need to copy-paste to complete the app.

## How to Use This File

1. Copy each code section
2. Create the file in the path shown
3. Paste the code
4. Save and the app will auto-reload

---

## File: app/layout.tsx
**Path: `frontend/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CKM Studio - Premium Clothing & Lifestyle",
  description: "Discover curated fashion and lifestyle products from CKM Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

---

## File: app/globals.css
**Path: `frontend/app/globals.css`** (Update existing file)

```css
@import "tailwindcss";

:root {
  --color-primary: #1a1a1a;
  --color-primary-light: #2d2d2d;
  --color-secondary: #ffffff;
  --color-accent: #d4af37;
  --color-accent-light: #e8c547;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  --font-serif: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;
  --font-mono: "Source Code Pro", monospace;
  --background: #ffffff;
  --foreground: #1a1a1a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  height: 100%;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

#__next {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  letter-spacing: -0.02em;
}

h1 { font-size: 3.75rem; line-height: 1.1; }
h2 { font-size: 2.25rem; line-height: 1.2; }
h3 { font-size: 1.875rem; line-height: 1.3; }

p { line-height: 1.6; }

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover { color: var(--color-accent); }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.container-fluid {
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 auto;
}

@media (min-width: 1280px) {
  .container-fluid {
    max-width: 1280px;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
}

.btn-accent {
  background-color: var(--color-accent);
  color: var(--color-primary);
}

.btn-accent:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-2px);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-neutral-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-400);
  border-radius: 4px;
}
```

---

## Component: components/header.tsx

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/lib/hooks';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart } = useCart();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            CKM <span className="text-amber-500">Studio</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
            <Link href="/blog" className="hover:text-amber-500 transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-neutral-100 rounded-lg"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            
            <Link href="/wishlist" className="p-2 hover:bg-neutral-100 rounded-lg relative">
              <Heart size={20} />
            </Link>
            
            <Link href="/cart" className="relative p-2 hover:bg-neutral-100 rounded-lg">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/account" className="hidden sm:block text-sm hover:text-amber-500">
              Account
            </Link>

            {/* Mobile Menu */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-amber-500">Home</Link>
            <Link href="/shop" className="block py-2 hover:text-amber-500">Shop</Link>
            <Link href="/blog" className="block py-2 hover:text-amber-500">Blog</Link>
            <Link href="/account" className="block py-2 hover:text-amber-500">Account</Link>
          </nav>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
            />
          </div>
        )}
      </div>
    </header>
  );
}
```

---

## Component: components/footer.tsx

```typescript
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              CKM <span className="text-amber-500">Studio</span>
            </h3>
            <p className="text-neutral-400 mb-4">
              Premium fashion and lifestyle products designed for modern living.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-amber-500">All Products</Link></li>
              <li><Link href="/shop?category=new" className="hover:text-amber-500">New</Link></li>
              <li><Link href="/shop?category=sale" className="hover:text-amber-500">Sale</Link></li>
              <li><Link href="/gift-cards" className="hover:text-amber-500">Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link href="/returns" className="hover:text-amber-500">Returns</Link></li>
              <li><Link href="/size-guides" className="hover:text-amber-500">Size Guides</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-500">About</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-amber-500">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-amber-500">Sustainability</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <p className="text-center text-neutral-400">
            &copy; {currentYear} CKM Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## Page: app/shop/page.tsx (Updated with Advanced Features)

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { ALL_PRODUCTS } from '@/lib/mockData';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);

  const categories = Array.from(new Set(ALL_PRODUCTS.map((p) => p.category)));
  const colors = Array.from(
    new Set(ALL_PRODUCTS.flatMap((p) => p.colors.map((c) => c.name)))
  );
  const sizes = Array.from(
    new Set(ALL_PRODUCTS.flatMap((p) => p.sizes.map((s) => s.label)))
  );

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const colorMatch =
        selectedColors.length === 0 ||
        product.colors.some((c) => selectedColors.includes(c.name));
      const sizeMatch =
        selectedSizes.length === 0 ||
        product.sizes.some((s) => selectedSizes.includes(s.label));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= minRating;
      const searchMatch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        categoryMatch &&
        colorMatch &&
        sizeMatch &&
        priceMatch &&
        ratingMatch &&
        searchMatch
      );
    });
  }, [
    selectedCategories,
    selectedColors,
    selectedSizes,
    priceRange,
    minRating,
    searchTerm,
  ]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-neutral-50 py-12 border-b border-neutral-200">
          <div className="container-fluid">
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-neutral-600">Discover our complete collection</p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12">
          <div className="container-fluid">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-56 flex-shrink-0">
                {/* Search */}
                <div className="mb-8">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, cat]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== cat)
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Price</h3>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="mt-2 text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Rating</h3>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full border border-neutral-200 rounded p-2"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4}>4★ & up</option>
                    <option value={4.5}>4.5★ & up</option>
                  </select>
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
                    <option value="rating">Top Rated</option>
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
                {sortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-neutral-600">No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Page: app/product/[id]/page.tsx (Product Detail)

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ALL_PRODUCTS } from '@/lib/mockData';
import { useCart, useWishlist, useToast } from '@/lib/hooks';
import { Heart, Share2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = ALL_PRODUCTS.find((p) => p.id === params.id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const isFavorite = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container-fluid py-12">
          <p className="text-center text-neutral-600">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      selectedColor,
      selectedSize,
    });
    addToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
    addToast('Added to wishlist!', 'success');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 lg:h-[600px] bg-neutral-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      currentImageIndex === idx ? 'border-amber-500' : 'border-neutral-200'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <p className="text-sm text-neutral-500 mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm font-bold text-red-500">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-600 mb-8">{product.longDescription}</p>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          selectedColor === color.name
                            ? 'border-amber-500'
                            : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">{selectedColor}</p>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.value)}
                        disabled={!size.available}
                        className={`px-4 py-2 rounded border-2 transition-all ${
                          selectedSize === size.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-neutral-200'
                        } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              {!product.inStock ? (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-700 font-bold">Out of Stock</p>
                </div>
              ) : product.stockCount < 10 ? (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700">Only {product.stockCount} left in stock!</p>
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`px-6 py-3 border-2 border-neutral-200 rounded flex items-center gap-2 hover:border-amber-500 transition-colors ${
                    isFavorite ? 'bg-amber-50 border-amber-500' : ''
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button className="px-6 py-3 border-2 border-neutral-200 rounded flex items-center gap-2 hover:border-amber-500">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4">
                <div>
                  <p className="text-sm text-neutral-600">Free shipping on orders over $100</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">30-day money-back guarantee</p>
                </div>
                <div>
                  <Link href={`/size-guides?category=${product.category}`} className="text-amber-600 hover:text-amber-700 font-semibold">
                    View Size Guide →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{review.author}</p>
                        {review.verified && (
                          <p className="text-xs text-green-600">✓ Verified Purchase</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold mb-2">{review.title}</h4>
                    <p className="text-neutral-600 mb-2">{review.content}</p>
                    <p className="text-xs text-neutral-500">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.relatedProductIds
                .slice(0, 4)
                .map((id) => {
                  const relatedProduct = ALL_PRODUCTS.find((p) => p.id === id);
                  return relatedProduct ? (
                    <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                      >
                        <div className="relative h-64 bg-neutral-100 rounded-lg overflow-hidden mb-4">
                          <Image
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform"
                          />
                        </div>
                        <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                        <p className="text-lg font-bold">${relatedProduct.price}</p>
                      </motion.div>
                    </Link>
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Page: app/cart/page.tsx (Shopping Cart)

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, useToast } from '@/lib/hooks';
import { ALL_PRODUCTS } from '@/lib/mockData';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { addToast } = useToast();

  const cartItems = cart.map((item) => ({
    item,
    product: ALL_PRODUCTS.find((p) => p.id === item.productId),
  })).filter((x) => x.product);

  const subtotal = cartItems.reduce(
    (acc, { item, product }) => acc + (product?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-fluid text-center">
            <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-neutral-600 mb-8">Your cart is empty</p>
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
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map(({ item, product }) => (
                  <motion.div
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="relative h-24 w-24 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product?.image || ''}
                        alt={product?.name || ''}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{product?.name}</h3>
                      {item.selectedColor && (
                        <p className="text-sm text-neutral-600">Color: {item.selectedColor}</p>
                      )}
                      {item.selectedSize && (
                        <p className="text-sm text-neutral-600">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-lg font-bold mt-2">${product?.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="px-2 py-1 border border-neutral-200 rounded hover:bg-neutral-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="px-2 py-1 border border-neutral-200 rounded hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">${((product?.price || 0) * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => {
                          removeFromCart(item.productId, item.selectedSize, item.selectedColor);
                          addToast('Removed from cart', 'info');
                        }}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-neutral-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal < 100 && (
                  <p className="text-sm text-amber-600 mb-4">
                    Free shipping on orders over $100! You're ${(100 - subtotal).toFixed(2)} away.
                  </p>
                )}

                <Link href="/checkout" className="btn btn-primary w-full block text-center mb-3">
                  Proceed to Checkout
                </Link>

                <Link href="/shop" className="btn btn-secondary w-full block text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Page: app/page.tsx (Home)

```typescript
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/product-card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 container-fluid text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Premium <span className="text-amber-400">Fashion</span> Redefined
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our curated collection of timeless pieces designed for the modern lifestyle.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/shop" className="btn btn-accent px-8 py-4">
                Shop Now
              </Link>
              <Link href="/about" className="btn btn-secondary px-8 py-4">
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="container-fluid">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Handpicked pieces from our latest collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {PRODUCTS.slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/shop" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-neutral-50">
          <div className="container-fluid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Free Shipping',
                  description: 'On orders over $100',
                  icon: '🚚',
                },
                {
                  title: 'Easy Returns',
                  description: '30-day return policy',
                  icon: '↩️',
                },
                {
                  title: 'Premium Quality',
                  description: 'Best materials & craftsmanship',
                  icon: '✨',
                },
                {
                  title: 'Sustainable',
                  description: 'Eco-friendly & ethical',
                  icon: '🌱',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Continue in next message...

Due to token limit, here are the remaining critical files you need to create. Copy each one and create the file in the specified path:

1. **components/product-card.tsx** - Already created in main conversation
2. **app/checkout/page.tsx** - Checkout process
3. **app/account/page.tsx** - User account
4. **app/blog/page.tsx** - Blog posts
5. **app/about/page.tsx** - About page
6. **app/contact/page.tsx** - Contact form
7. **app/wishlist/page.tsx** - Wishlist
8. **app/faq/page.tsx** - FAQ
9. **app/returns/page.tsx** - Returns policy
10. **app/size-guides/page.tsx** - Size guides
11. **components/product-filters.tsx** - Advanced filters
12. **components/search-bar.tsx** - Search
13. **components/toast.tsx** - Toast notifications

Would you like me to create these remaining files in a follow-up response? Or would you prefer I create a complete zip file or single reference document?

---

## To Deploy on Lovable

1. Create new Next.js project on Lovable
2. Copy `package.json` content
3. Copy all files from `lib/` folder
4. Copy all files from `components/` folder
5. Copy all files from `app/` folder
6. Lovable will auto-detect and deploy

Your app will be live with all e-commerce features! 🎉
