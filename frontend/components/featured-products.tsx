'use client';

import { motion } from 'framer-motion';
import ProductCard from './product-card';

const FEATURED_PRODUCTS = [
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
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="container-fluid">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Handpicked pieces from our latest collection, curated for style and quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
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

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-primary">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}
