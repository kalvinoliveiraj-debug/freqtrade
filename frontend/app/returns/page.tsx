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
              <p className="text-neutral-600 mb-4">
                We want you to love your purchase! If you're not satisfied, we offer 30-day returns on all items.
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2">
                <li>Items must be unworn and unwashed</li>
                <li>Original tags must still be attached</li>
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
                <li>Package your item</li>
                <li>Drop off at any shipping location</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refunds</h2>
              <p className="text-neutral-600">
                Once we receive and inspect your return, we'll process a refund within 5-7 business days. Original shipping costs are not refunded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <p className="text-neutral-600">
                Need a different size or color? We offer free exchanges within 30 days. Contact us at hello@ckm.studio to arrange.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
