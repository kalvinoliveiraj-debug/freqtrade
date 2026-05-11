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
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Creating timeless fashion for the modern lifestyle
            </p>
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
                  Founded in 2020, CKM Studio was born from a simple idea: create premium fashion that doesn't compromise on quality or ethics.
                </p>
                <p className="text-neutral-600 mb-4">
                  Every piece in our collection is carefully curated and designed with intention. From fabric selection to the final stitch, we ensure that each item meets our rigorous standards.
                </p>
                <p className="text-neutral-600">
                  Today, CKM Studio serves thousands of customers who share our passion for timeless style and conscious consumption.
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
              {[
                { title: 'Quality', desc: 'Premium materials and craftsmanship' },
                { title: 'Sustainability', desc: 'Ethical production and eco-friendly' },
                { title: 'Simplicity', desc: 'Timeless design over trends' },
              ].map((val, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                  <p className="text-neutral-600">{val.desc}</p>
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
