'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-20">
          <div className="container-fluid text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About CKM Studio
            </motion.h1>
            <motion.p
              className="text-xl text-neutral-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Creating timeless fashion for the modern lifestyle
            </motion.p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container-fluid">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-neutral-600 mb-4 text-lg leading-relaxed">
                  Founded in 2020, CKM Studio was born from a simple idea: create premium fashion
                  that doesn't compromise on quality or ethics. We believe that great style doesn't
                  need to be complicated.
                </p>
                <p className="text-neutral-600 mb-4 text-lg leading-relaxed">
                  Every piece in our collection is carefully curated and designed with intention.
                  From the fabric selection to the final stitch, we ensure that each item meets
                  our rigorous standards for quality and sustainability.
                </p>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  Today, CKM Studio serves thousands of customers who share our passion for
                  timeless style and conscious consumption.
                </p>
              </motion.div>

              <motion.div
                className="relative h-96 rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
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

        {/* Values */}
        <section className="py-20 bg-neutral-50">
          <div className="container-fluid">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality',
                  description: 'We use premium materials and craftsmanship in every piece',
                },
                {
                  title: 'Sustainability',
                  description: 'Ethical production and eco-friendly practices matter to us',
                },
                {
                  title: 'Simplicity',
                  description: 'Less is more. Timeless design over fleeting trends',
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-neutral-600 text-lg">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-900 text-white text-center">
          <div className="container-fluid">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Collection?</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Explore our curated selection of premium fashion and lifestyle products.
            </p>
            <a href="/shop" className="btn btn-accent">
              Shop Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
