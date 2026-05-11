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
            {/* Categories */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
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
            </div>

            {/* Size Guide */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-neutral-200 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-8">{selectedGuide.category}</h2>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full">
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
                  <h3 className="font-bold text-lg mb-4">Tips</h3>
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
