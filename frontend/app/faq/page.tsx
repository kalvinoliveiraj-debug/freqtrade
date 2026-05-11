'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  { q: 'What is your return policy?', a: 'We offer 30-day returns on all items. Items must be unworn and in original packaging.' },
  { q: 'Do you offer free shipping?', a: 'Yes! Free shipping on orders over $100.' },
  { q: 'How do I track my order?', a: 'You\'ll receive a tracking link via email once your order ships.' },
  { q: 'What materials do you use?', a: 'We use premium natural fibers including cotton, wool, linen, and silk.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship to the US, Canada, and Mexico.' },
  { q: 'How do I care for my items?', a: 'Each item comes with detailed care instructions. Most items are machine washable.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-2xl">
          <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{item.q}</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {openIndex === i && (
                  <p className="mt-4 text-neutral-600">{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
