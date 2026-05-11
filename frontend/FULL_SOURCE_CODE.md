# 🎉 COMPLETE CKM STUDIO E-COMMERCE APP - FULL SOURCE CODE

Copy this entire document. Instructions at the bottom on where each file goes.

---

# FILE: package.json

```json
{
  "name": "ckm-studio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "gsap": "^3.15.0",
    "lucide-react": "^1.14.0",
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

# FILE: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

# FILE: next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

---

# FILE: postcss.config.mjs

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

# FILE: tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#ffffff",
        accent: "#d4af37",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

# FILE: lib/types.ts

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  colors: Color[];
  sizes: Size[];
  materials: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  relatedProductIds: string[];
  sizeGuideId: string;
  reviews: Review[];
}

export interface Color {
  name: string;
  hex: string;
  image: string;
}

export interface Size {
  label: string;
  value: string;
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface SizeGuide {
  id: string;
  category: string;
  sizes: SizeGuideEntry[];
  tips: string[];
}

export interface SizeGuideEntry {
  size: string;
  chest?: string;
  waist?: string;
  length?: string;
  inseam?: string;
  fit?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
}
```

---

# FILE: lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

# FILE: lib/hooks.ts

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { CartItem, User } from './types';

const CART_STORAGE_KEY = 'ckm-cart';
const WISHLIST_STORAGE_KEY = 'ckm-wishlist';
const USER_STORAGE_KEY = 'ckm-user';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) setCart(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: string, size?: string, color?: string) => {
      setCart((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.selectedSize === size &&
              i.selectedColor === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string, color?: string) => {
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId &&
          i.selectedSize === size &&
          i.selectedColor === color
            ? { ...i, quantity: Math.max(0, quantity) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoading };
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (saved) setWishlist(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, isLoading };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      addresses: [],
      orders: [],
    };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  return { user, login, logout, isLoading, isAuthenticated: !!user };
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>
  >([]);

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
      const id = `toast-${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
```

---

# FILE: lib/mockData.ts

```typescript
import { Product, BlogPost, SizeGuide } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'tshirt-1',
    name: 'Minimalist White Tee',
    description: 'Essential wardrobe staple',
    longDescription: 'Pure cotton, perfectly fitted minimalist white t-shirt. The foundation of any great wardrobe. Premium quality with reinforced seams and fade-resistant fabric.',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    ],
    category: 'T-Shirts',
    subcategory: 'Basic Tees',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
      { label: 'XL', value: 'xl', available: true },
    ],
    materials: ['100% Cotton'],
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    stockCount: 150,
    tags: ['bestseller', 'new'],
    relatedProductIds: ['tshirt-2', 'tshirt-3'],
    sizeGuideId: 'tshirt-guide',
    reviews: [
      {
        id: 'rev1',
        author: 'Sarah M.',
        rating: 5,
        title: 'Perfect fit!',
        content: 'Great quality, soft fabric, perfect fit.',
        date: '2024-05-10',
        verified: true,
        helpfulCount: 45,
      },
    ],
  },
  {
    id: 'tshirt-2',
    name: 'Classic Black Tee',
    description: 'Timeless black t-shirt',
    longDescription: 'Premium black t-shirt crafted from organic cotton. Perfect for any occasion.',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'],
    category: 'T-Shirts',
    subcategory: 'Basic Tees',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
      { label: 'XL', value: 'xl', available: true },
    ],
    materials: ['100% Organic Cotton'],
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
    stockCount: 180,
    tags: ['bestseller'],
    relatedProductIds: ['tshirt-1', 'blazer-1'],
    sizeGuideId: 'tshirt-guide',
    reviews: [],
  },
  {
    id: 'blazer-1',
    name: 'Classic Black Blazer',
    description: 'Tailored black blazer',
    longDescription: 'Impeccably tailored black blazer in premium wool. Perfect for the office or evening events.',
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop'],
    category: 'Blazers',
    subcategory: 'Tailored',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
      { label: 'XL', value: 'xl', available: true },
    ],
    materials: ['100% Wool'],
    rating: 4.9,
    reviewCount: 267,
    inStock: true,
    stockCount: 60,
    tags: ['bestseller', 'premium'],
    relatedProductIds: ['tshirt-1', 'pants-1'],
    sizeGuideId: 'blazer-guide',
    reviews: [],
  },
  {
    id: 'dress-1',
    name: 'Elegant White Dress',
    description: 'Timeless white dress',
    longDescription: 'A classic white dress perfect for any occasion. Made from premium cotton blend.',
    price: 159,
    originalPrice: 219,
    image: 'https://images.unsplash.com/photo-1595777707802-52d71ae4fdb1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1595777707802-52d71ae4fdb1?w=500&h=500&fit=crop'],
    category: 'Dresses',
    subcategory: 'Casual',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1595777707802-52d71ae4fdb1?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
    ],
    materials: ['95% Cotton, 5% Elastane'],
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    stockCount: 75,
    tags: ['bestseller'],
    relatedProductIds: ['tshirt-1'],
    sizeGuideId: 'dress-guide',
    reviews: [],
  },
  {
    id: 'pants-1',
    name: 'Premium Denim Jeans',
    description: 'Classic blue jeans',
    longDescription: 'Premium denim jeans made from high-quality cotton. Perfect fit with timeless style.',
    price: 129,
    originalPrice: 179,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'],
    category: 'Jeans',
    subcategory: 'Classic',
    colors: [
      { name: 'Blue', hex: '#4A90E2', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: '28', value: '28', available: true },
      { label: '30', value: '30', available: true },
      { label: '32', value: '32', available: true },
      { label: '34', value: '34', available: true },
    ],
    materials: ['100% Cotton Denim'],
    rating: 4.8,
    reviewCount: 421,
    inStock: true,
    stockCount: 200,
    tags: ['bestseller'],
    relatedProductIds: ['tshirt-1', 'blazer-1'],
    sizeGuideId: 'jeans-guide',
    reviews: [],
  },
  {
    id: 'shoes-1',
    name: 'Classic Oxford Shoes',
    description: 'Timeless oxford shoes',
    longDescription: 'Classic black oxford shoes crafted from premium leather.',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1543163521-9145f931371e?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1543163521-9145f931371e?w=500&h=500&fit=crop'],
    category: 'Shoes',
    subcategory: 'Formal',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1543163521-9145f931371e?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: '6', value: '6', available: true },
      { label: '7', value: '7', available: true },
      { label: '8', value: '8', available: true },
      { label: '9', value: '9', available: true },
      { label: '10', value: '10', available: true },
    ],
    materials: ['100% Leather'],
    rating: 4.8,
    reviewCount: 267,
    inStock: true,
    stockCount: 95,
    tags: ['bestseller'],
    relatedProductIds: ['blazer-1', 'pants-1'],
    sizeGuideId: 'shoe-guide',
    reviews: [],
  },
  {
    id: 'acc-1',
    name: 'Silk Scarf',
    description: 'Premium silk scarf',
    longDescription: 'Luxurious silk scarf with classic design.',
    price: 45,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'],
    category: 'Accessories',
    subcategory: 'Scarves',
    colors: [
      { name: 'Multicolor', hex: '#FF6B6B', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop' },
    ],
    sizes: [{ label: 'One Size', value: 'onesize', available: true }],
    materials: ['100% Silk'],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockCount: 85,
    tags: ['bestseller'],
    relatedProductIds: [],
    sizeGuideId: 'acc-guide',
    reviews: [],
  },
  {
    id: 'sweater-1',
    name: 'Cashmere Sweater',
    description: 'Luxurious cashmere',
    longDescription: 'Premium cashmere crewneck sweater. Incredibly soft.',
    price: 219,
    originalPrice: 319,
    image: 'https://images.unsplash.com/photo-1560142789-f2bb1ee6b2f3?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1560142789-f2bb1ee6b2f3?w=500&h=500&fit=crop'],
    category: 'Sweaters',
    subcategory: 'Cashmere',
    colors: [
      { name: 'Cream', hex: '#FFFDD0', image: 'https://images.unsplash.com/photo-1560142789-f2bb1ee6b2f3?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
    ],
    materials: ['100% Cashmere'],
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    stockCount: 50,
    tags: ['premium'],
    relatedProductIds: ['tshirt-1'],
    sizeGuideId: 'sweater-guide',
    reviews: [],
  },
  {
    id: 'jacket-1',
    name: 'Wool Overcoat',
    description: 'Luxurious wool coat',
    longDescription: 'Premium wool overcoat with sophisticated design.',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop'],
    category: 'Outerwear',
    subcategory: 'Coats',
    colors: [
      { name: 'Charcoal', hex: '#36454F', image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=500&h=500&fit=crop' },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: true },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
    ],
    materials: ['100% Wool'],
    rating: 4.9,
    reviewCount: 134,
    inStock: true,
    stockCount: 35,
    tags: ['premium'],
    relatedProductIds: ['blazer-1', 'pants-1'],
    sizeGuideId: 'jacket-guide',
    reviews: [],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Timeless Pieces Every Wardrobe Needs',
    excerpt: 'Discover the essential items that form the foundation of a versatile wardrobe.',
    content: 'A great wardrobe is built on timeless essentials. A white tee, black blazer, classic jeans, oxford shirt, and neutral shoes.',
    author: 'Sarah Mitchell',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1595521624183-00784f1ec9f0?w=600&h=400&fit=crop',
    category: 'Style Tips',
    readTime: 5,
  },
  {
    id: 'blog-2',
    title: 'How to Style Oversized Blazers',
    excerpt: 'Master the art of wearing oversized blazers with these styling tips.',
    content: 'Oversized blazers are the perfect trend piece that can be styled in multiple ways.',
    author: 'Emma Johnson',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1539533057440-7bf6b42c3d25?w=600&h=400&fit=crop',
    category: 'Styling',
    readTime: 4,
  },
  {
    id: 'blog-3',
    title: 'Sustainable Fashion: Making Better Choices',
    excerpt: 'Learn how to shop sustainably without compromising on style.',
    content: 'Sustainable fashion is more important than ever. Here are ways to make eco-friendly choices.',
    author: 'John Davis',
    date: '2024-05-05',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop',
    category: 'Sustainability',
    readTime: 6,
  },
];

export const SIZE_GUIDES: SizeGuide[] = [
  {
    id: 'tshirt-guide',
    category: 'T-Shirts & Tops',
    sizes: [
      { size: 'XS', chest: '32"', length: '27"', fit: 'Fitted' },
      { size: 'S', chest: '34"', length: '28"', fit: 'Fitted' },
      { size: 'M', chest: '38"', length: '29"', fit: 'Regular' },
      { size: 'L', chest: '42"', length: '30"', fit: 'Regular' },
      { size: 'XL', chest: '46"', length: '31"', fit: 'Relaxed' },
    ],
    tips: ['Measure across the chest', 'Our shirts are pre-shrunk', 'Length varies by style'],
  },
  {
    id: 'blazer-guide',
    category: 'Blazers',
    sizes: [
      { size: 'XS', chest: '32"', length: '24"', fit: 'Tailored' },
      { size: 'S', chest: '34"', length: '25"', fit: 'Tailored' },
      { size: 'M', chest: '38"', length: '26"', fit: 'Tailored' },
      { size: 'L', chest: '42"', length: '27"', fit: 'Tailored' },
    ],
    tips: ['Shoulder seams align with shoulders', 'We offer free alterations', 'Tailored fit'],
  },
  {
    id: 'dress-guide',
    category: 'Dresses',
    sizes: [
      { size: 'XS', chest: '32"', length: '40"', fit: 'Fitted' },
      { size: 'S', chest: '34"', length: '41"', fit: 'Fitted' },
      { size: 'M', chest: '38"', length: '42"', fit: 'Regular' },
      { size: 'L', chest: '42"', length: '43"', fit: 'Regular' },
    ],
    tips: ['Dresses should skim the body', 'Measure shoulder to knee', 'Hemming services included'],
  },
  {
    id: 'jeans-guide',
    category: 'Jeans',
    sizes: [
      { size: '28', waist: '28"', inseam: '30"', fit: 'Slim' },
      { size: '30', waist: '30"', inseam: '30"', fit: 'Regular' },
      { size: '32', waist: '32"', inseam: '32"', fit: 'Regular' },
      { size: '34', waist: '34"', inseam: '32"', fit: 'Regular' },
    ],
    tips: ['Jeans should sit at natural waist', 'Inseam reaches top of shoe', 'Denim shrinks slightly'],
  },
  {
    id: 'shoe-guide',
    category: 'Shoes',
    sizes: [
      { size: '6', fit: 'US Womens 6' },
      { size: '7', fit: 'US Womens 7' },
      { size: '8', fit: 'US Womens 8' },
      { size: '9', fit: 'US Womens 9' },
      { size: '10', fit: 'US Womens 10' },
    ],
    tips: ['Fit snugly without pinching', 'Thumbs width space at heel', 'Free returns on shoes'],
  },
  {
    id: 'sweater-guide',
    category: 'Sweaters',
    sizes: [
      { size: 'XS', chest: '32"', length: '24"', fit: 'Fitted' },
      { size: 'S', chest: '34"', length: '25"', fit: 'Fitted' },
      { size: 'M', chest: '38"', length: '26"', fit: 'Regular' },
      { size: 'L', chest: '42"', length: '27"', fit: 'Regular' },
    ],
    tips: ['Fit close to body', 'Cashmere needs special care', 'Wash cold, lay flat to dry'],
  },
  {
    id: 'acc-guide',
    category: 'Accessories',
    sizes: [{ size: 'One Size', fit: 'Adjustable' }],
    tips: ['Most accessories one size fits all', 'Necklaces adjustable', 'Scarves styled multiple ways'],
  },
  {
    id: 'jacket-guide',
    category: 'Jackets',
    sizes: [
      { size: 'XS', chest: '32"', length: '28"', fit: 'Fitted' },
      { size: 'S', chest: '34"', length: '29"', fit: 'Fitted' },
      { size: 'M', chest: '38"', length: '30"', fit: 'Regular' },
      { size: 'L', chest: '42"', length: '31"', fit: 'Regular' },
    ],
    tips: ['Allow room for layering', 'Sleeves end at wrist', 'Length covers hip'],
  },
];

export const ALL_PRODUCTS = PRODUCTS;
```

---

# FILE: app/layout.tsx

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
  title: "CKM Studio - Premium Clothing",
  description: "Discover curated fashion from CKM Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
```

---

# FILE: app/globals.css

```css
@import "tailwindcss";

:root {
  --color-primary: #1a1a1a;
  --color-secondary: #ffffff;
  --color-accent: #d4af37;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
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

.container-fluid {
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 auto;
  max-width: 1280px;
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
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.btn-primary:hover {
  background-color: #2d2d2d;
  transform: translateY(-2px);
}

.btn-accent {
  background-color: var(--color-accent);
  color: var(--color-primary);
}

.btn-accent:hover {
  background-color: #e8c547;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}
```

---

# FILE: components/header.tsx

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/lib/hooks';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            CKM <span className="text-amber-500">Studio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-amber-500">Home</Link>
            <Link href="/shop" className="hover:text-amber-500">Shop</Link>
            <Link href="/blog" className="hover:text-amber-500">Blog</Link>
            <Link href="/about" className="hover:text-amber-500">About</Link>
            <Link href="/contact" className="hover:text-amber-500">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="p-2 hover:bg-neutral-100 rounded-lg">
              <Heart size={20} />
            </Link>
            
            <Link href="/cart" className="relative p-2 hover:bg-neutral-100 rounded-lg">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/account" className="hidden sm:block text-sm hover:text-amber-500">
              Account
            </Link>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-amber-500">Home</Link>
            <Link href="/shop" className="block py-2 hover:text-amber-500">Shop</Link>
            <Link href="/blog" className="block py-2 hover:text-amber-500">Blog</Link>
            <Link href="/account" className="block py-2 hover:text-amber-500">Account</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
```

---

# FILE: components/footer.tsx

```typescript
'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              CKM <span className="text-amber-500">Studio</span>
            </h3>
            <p className="text-neutral-400">Premium fashion designed for modern living.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-amber-500">All Products</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500">Style Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link href="/returns" className="hover:text-amber-500">Returns</Link></li>
              <li><Link href="/size-guides" className="hover:text-amber-500">Size Guides</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-500">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>&copy; {year} CKM Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

# FILE: components/product-card.tsx

```typescript
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
    addToast(`Added to cart!`, 'success');
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

          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100 disabled:opacity-50"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-white text-neutral-900 p-3 rounded-full hover:bg-neutral-100"
            >
              <Heart
                size={20}
                fill={isFavorite ? 'red' : 'none'}
                color={isFavorite ? 'red' : 'currentColor'}
              />
            </button>
          </motion.div>
        </div>

        <div>
          <p className="text-xs text-neutral-500 mb-1 uppercase">{product.category}</p>
          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price}</span>
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
```

---

# FILE: app/page.tsx

```typescript
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { PRODUCTS } from '@/lib/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 container-fluid text-center">
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Premium <span className="text-amber-400">Fashion</span> Redefined
            </motion.h1>

            <motion.p
              className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover our curated collection of timeless pieces.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/shop" className="btn btn-accent">
                Shop Now
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-fluid">
            <h2 className="text-4xl font-bold text-center mb-16">Featured Collection</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {PRODUCTS.slice(0, 6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
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

        <section className="py-20 bg-neutral-50">
          <div className="container-fluid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['Free Shipping', 'Easy Returns', 'Premium Quality', 'Sustainable'].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="font-bold text-lg mb-2">{feature}</h3>
                </div>
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

# FILE: app/shop/page.tsx

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
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(ALL_PRODUCTS.map((p) => p.category)));

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [selectedCategories, priceRange, searchTerm]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === 'price-low') return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-neutral-50 py-12">
          <div className="container-fluid">
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-neutral-600">Discover our complete collection</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-fluid">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="w-full lg:w-56">
                <div className="space-y-8">
                  <div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-200 rounded"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Categories</h3>
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
                                setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                              }
                            }}
                            className="mr-2"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Price</h3>
                    <input
                      type="range"
                      min="0"
                      max="400"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <p className="text-sm mt-2">${priceRange[0]} - ${priceRange[1]}</p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Sort By</h3>
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
                </div>
              </aside>

              <div className="flex-1">
                <p className="text-neutral-600 mb-4">Showing {sortedProducts.length} products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
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
```

---

# FILE: app/product/[id]/page.tsx

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-bold mb-6">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">({product.reviewCount})</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-neutral-600 mb-8">{product.longDescription}</p>

              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color.name ? 'border-amber-500' : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.value)}
                        className={`px-4 py-2 rounded border-2 transition-all ${
                          selectedSize === size.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-neutral-200'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-neutral-200 rounded"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-neutral-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button onClick={handleAddToCart} className="btn btn-primary flex-1">
                  Add to Cart
                </button>
                <button className="px-6 py-3 border-2 border-neutral-200 rounded hover:border-amber-500">
                  <Heart
                    size={20}
                    fill={isFavorite ? 'red' : 'none'}
                    color={isFavorite ? 'red' : 'currentColor'}
                  />
                </button>
              </div>

              <div className="border-t pt-6 space-y-2 text-sm text-neutral-600">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day money-back guarantee</p>
                <Link href={`/size-guides`} className="text-amber-600 hover:text-amber-700 font-bold">
                  View Size Guide →
                </Link>
              </div>
            </motion.div>
          </div>

          {product.reviews.length > 0 && (
            <div className="mt-16 border-t pt-12">
              <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <p className="font-bold">{review.author}</p>
                      <div className="flex">
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
                    <p className="text-neutral-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

# FILE: app/cart/page.tsx

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
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ item, product }) => (
                <motion.div
                  key={`${item.productId}-${item.selectedSize}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                    <h3 className="font-bold">{product?.name}</h3>
                    <p className="text-sm text-neutral-600">${product?.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedSize)}
                      className="px-2 py-1 border border-neutral-200 rounded"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedSize)}
                      className="px-2 py-1 border border-neutral-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${((product?.price || 0) * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => {
                        removeFromCart(item.productId, item.selectedSize);
                        addToast('Removed from cart', 'info');
                      }}
                      className="text-red-600 mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border border-neutral-200 rounded-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
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

              <Link href="/checkout" className="btn btn-primary w-full block text-center mb-3">
                Checkout
              </Link>

              <Link href="/shop" className="btn btn-secondary w-full block text-center">
                Continue Shopping
              </Link>
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

# FILE: app/checkout/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useToast } from '@/lib/hooks';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Order placed successfully!', 'success');
    setStep(3);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="flex gap-4 mb-12">
            {['Shipping', 'Payment', 'Confirmation'].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step > i ? 'bg-green-500' : step === i + 1 ? 'bg-amber-500' : 'bg-neutral-200'
                  } text-white`}
                >
                  {i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.form
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-neutral-200 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-neutral-200 rounded"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />

              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-neutral-200 rounded"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-neutral-200 rounded"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-neutral-200 rounded"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Continue to Payment
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              onSubmit={handleSubmitOrder}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="border p-6 rounded">
                <h3 className="font-bold mb-4">Card Information</h3>
                <input
                  type="text"
                  placeholder="4111 1111 1111 1111"
                  defaultValue="4111 1111 1111 1111"
                  className="w-full px-4 py-3 border border-neutral-200 rounded mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/25"
                    className="px-4 py-3 border border-neutral-200 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="123"
                    className="px-4 py-3 border border-neutral-200 rounded"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Place Order
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-neutral-600 mb-8">Check your email for confirmation.</p>
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

# FILE: app/account/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useAuth, useToast } from '@/lib/hooks';
import { useState } from 'react';

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-fluid text-center">
            <h1 className="text-4xl font-bold mb-4">My Account</h1>
            <p className="text-neutral-600 mb-8">Please log in</p>
            <Link href="/login" className="btn btn-primary">
              Log In
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
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg h-fit">
              <p className="text-sm text-neutral-600 mb-2">Logged in as</p>
              <p className="font-bold mb-8">{user?.email}</p>

              <nav className="space-y-2 mb-8">
                {['profile', 'orders', 'wishlist'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      activeTab === tab
                        ? 'bg-amber-500 text-white'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>

              <button
                onClick={() => {
                  logout();
                  addToast('Logged out', 'info');
                }}
                className="w-full px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100"
              >
                Log Out
              </button>
            </div>

            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white p-8 border border-neutral-200 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Profile</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-600">Email</p>
                      <p className="font-semibold">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white p-8 border border-neutral-200 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Orders</h2>
                  <p className="text-neutral-600">No orders yet</p>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white p-8 border border-neutral-200 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  <Link href="/wishlist" className="text-amber-600">
                    View Wishlist →
                  </Link>
                </div>
              )}
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

# FILES CONTINUED IN NEXT MESSAGE...

Due to character limits, I'll provide the remaining files in organized sections. Copy all of the above first, then continue with the files below.

---

# REMAINING FILES (Continue from here)

## FILE: app/blog/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { BLOG_POSTS } from '@/lib/mockData';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Style Guide</h1>
          <p className="text-neutral-600 mb-12">Tips and inspiration from our experts</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg"
              >
                <div className="relative h-48 bg-neutral-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-amber-600 mb-2">{post.category}</p>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{post.excerpt}</p>
                  <p className="text-xs text-neutral-500">{post.date}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

## FILE: app/about/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-neutral-900 text-white py-20">
          <div className="container-fluid text-center">
            <h1 className="text-5xl font-bold mb-6">About CKM Studio</h1>
            <p className="text-xl text-neutral-300">Creating timeless fashion for modern living</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container-fluid">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-neutral-600 mb-4">
                  Founded in 2020, CKM Studio was born from a simple idea: create premium fashion that doesn't compromise on quality.
                </p>
                <p className="text-neutral-600">
                  Every piece is carefully curated with intention. From fabric selection to the final stitch, we ensure quality and sustainability.
                </p>
              </motion.div>

              <motion.div
                className="relative h-96 rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop"
                  alt="CKM Studio"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="container-fluid">
            <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Quality', 'Sustainability', 'Simplicity'].map((val, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">{val}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-900 text-white text-center">
          <div className="container-fluid">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Collection?</h2>
            <Link href="/shop" className="btn btn-accent">
              Shop Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

## FILE: app/contact/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useToast } from '@/lib/hooks';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message sent! We\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-12">Contact Us</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail size={24} className="text-amber-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-neutral-600">hello@ckm.studio</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={24} className="text-amber-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Phone</p>
                    <p className="text-neutral-600">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={24} className="text-amber-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="text-neutral-600">123 Fashion St, Studio City, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              ></textarea>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

## FILE: app/wishlist/page.tsx

```typescript
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
```

## FILE: app/faq/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  { q: 'What is your return policy?', a: 'We offer 30-day returns on all items in original condition.' },
  { q: 'Do you offer free shipping?', a: 'Yes! Free shipping on orders over $100.' },
  { q: 'How do I track my order?', a: 'You\'ll receive a tracking link via email once your order ships.' },
  { q: 'What materials do you use?', a: 'We use premium natural fibers including cotton, wool, linen, and silk.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship to US, Canada, and Mexico.' },
  { q: 'How do I care for my items?', a: 'Each item comes with detailed care instructions.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-2xl">
          <h1 className="text-4xl font-bold mb-12 text-center">FAQ</h1>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 border border-neutral-200 rounded-lg hover:bg-neutral-50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{item.q}</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {openIndex === i && <p className="mt-4 text-neutral-600">{item.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

## FILE: app/returns/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">30-Day Return Policy</h2>
              <p className="text-neutral-600 mb-4">We want you to love your purchase! If not satisfied, we offer 30-day returns.</p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2">
                <li>Items must be unworn and unwashed</li>
                <li>Original tags must be attached</li>
                <li>Items must be in original packaging</li>
                <li>Return shipping is free</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Return</h2>
              <ol className="list-decimal list-inside text-neutral-600 space-y-2">
                <li>Log into your account</li>
                <li>Go to Order History</li>
                <li>Select the item to return</li>
                <li>Print the prepaid shipping label</li>
                <li>Drop off at any shipping location</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refunds</h2>
              <p className="text-neutral-600">
                Once we receive your return, we'll process a refund within 5-7 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

## FILE: app/size-guides/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { SIZE_GUIDES } from '@/lib/mockData';
import { useState } from 'react';

export default function SizeGuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState(SIZE_GUIDES[0]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-12">Size Guides</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg h-fit">
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {SIZE_GUIDES.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide)}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      selectedGuide.id === guide.id
                        ? 'bg-amber-500 text-white'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    {guide.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white border border-neutral-200 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-8">{selectedGuide.category}</h2>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-bold">Size</th>
                        {selectedGuide.sizes[0].chest && <th className="text-left py-3 px-4 font-bold">Chest</th>}
                        {selectedGuide.sizes[0].waist && <th className="text-left py-3 px-4 font-bold">Waist</th>}
                        {selectedGuide.sizes[0].length && <th className="text-left py-3 px-4 font-bold">Length</th>}
                        {selectedGuide.sizes[0].inseam && <th className="text-left py-3 px-4 font-bold">Inseam</th>}
                        {selectedGuide.sizes[0].fit && <th className="text-left py-3 px-4 font-bold">Fit</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedGuide.sizes.map((size, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-4 font-bold">{size.size}</td>
                          {size.chest && <td className="py-3 px-4">{size.chest}</td>}
                          {size.waist && <td className="py-3 px-4">{size.waist}</td>}
                          {size.length && <td className="py-3 px-4">{size.length}</td>}
                          {size.inseam && <td className="py-3 px-4">{size.inseam}</td>}
                          {size.fit && <td className="py-3 px-4">{size.fit}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-bold mb-4">Tips</h3>
                  <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    {selectedGuide.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
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

## FILE: app/login/page.tsx

```typescript
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useAuth, useToast } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    login(email, password);
    addToast('Logged in!', 'success');
    router.push('/account');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">Log In</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200 rounded-lg">
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <p className="text-sm text-blue-900">
              <strong>Demo:</strong> Use any email/password to log in.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

# INSTALLATION INSTRUCTIONS

## Step 1: Create Project
```bash
mkdir my-ckm-studio && cd my-ckm-studio
```

## Step 2: Create File Structure
```
my-ckm-studio/
├── app/
├── components/
├── lib/
├── public/
├── node_modules/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── tailwind.config.ts
```

## Step 3: Copy Files
1. Create all files listed above in the correct directories
2. Place each code block in the file path shown

## Step 4: Install & Run
```bash
npm install
npm run dev
```

## Step 5: Open Browser
```
http://localhost:3000
```

---

**ALL CODE IS READY TO COPY-PASTE!** 🎉
