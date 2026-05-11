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
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-neutral-600 mb-12">We'd love to hear from you</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@ckm.studio' },
                  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890' },
                  { icon: MapPin, label: 'Address', value: '123 Fashion St, Studio City, CA 90210' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <Icon size={24} className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold">{item.label}</p>
                        <p className="text-neutral-600">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
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
