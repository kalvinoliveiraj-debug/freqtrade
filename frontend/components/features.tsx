'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Leaf, RotateCcw } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $100. Delivery within 5-7 business days.',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your data is encrypted and safe with our secure payment processing.',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Eco-friendly materials and ethical production practices.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy. No questions asked returns.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Icon size={32} className="text-amber-600" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
