'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { BLOG_POSTS } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Style Guide</h1>
          <p className="text-neutral-600 mb-12">Tips, trends, and inspiration from our style experts</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-600 uppercase">{post.category}</span>
                    <span className="text-xs text-neutral-600">{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-neutral-500">{post.date}</span>
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                      Read More →
                    </a>
                  </div>
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
