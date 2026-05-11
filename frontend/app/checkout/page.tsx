'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useAuth, useToast } from '@/lib/hooks';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { user, login, isAuthenticated } = useAuth();
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
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Order placed successfully! Order confirmation sent to your email.', 'success');
    setStep(3);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          {/* Steps */}
          <div className="flex gap-4 mb-12">
            {['Shipping', 'Payment', 'Confirmation'].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step > i
                      ? 'bg-green-500 text-white'
                      : step === i + 1
                      ? 'bg-amber-500 text-white'
                      : 'bg-neutral-200'
                  }`}
                >
                  {i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
                {i < 2 && <div className="hidden sm:block w-8 h-1 bg-neutral-200"></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                />

                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>Other</option>
                </select>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Shipping Method</h3>
                  {['standard', 'express', 'overnight'].map((method) => (
                    <label key={method} className="flex items-center gap-3 mb-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method}
                        checked={formData.shippingMethod === method}
                        onChange={handleInputChange}
                      />
                      <span className="capitalize">
                        {method === 'standard' ? 'Standard (5-7 days) - FREE' : method === 'express' ? 'Express (2-3 days) - $15' : 'Overnight - $30'}
                      </span>
                    </label>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Payment Method</h3>
                  {['card', 'paypal', 'apple'].map((method) => (
                    <label key={method} className="flex items-center gap-3 mb-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                      />
                      <span className="capitalize">
                        {method === 'card' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'Apple Pay'}
                      </span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 border p-4 rounded">
                    <input
                      type="text"
                      placeholder="Card Number"
                      defaultValue="4111 1111 1111 1111"
                      className="w-full px-4 py-3 border border-neutral-200 rounded"
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
                )}

                <div className="flex gap-3">
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
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-neutral-600 mb-8">
                Thank you for your order. A confirmation email has been sent to {formData.email}
              </p>
              <div className="bg-neutral-50 p-8 rounded-lg mb-8">
                <p className="text-sm text-neutral-600 mb-2">Order Number</p>
                <p className="text-2xl font-bold">ORD-{Date.now().toString().slice(-6)}</p>
              </div>
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
