'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              CKM <span className="text-amber-500">Studio</span>
            </h3>
            <p className="text-neutral-400 mb-4">
              Premium fashion and lifestyle products designed for modern living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition-colors text-sm font-semibold">
                f
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors text-sm font-semibold">
                ig
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors text-sm font-semibold">
                𝕏
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-amber-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=new" className="hover:text-amber-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sale" className="hover:text-amber-500 transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bestsellers" className="hover:text-amber-500 transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                <a href="mailto:hello@ckm.studio" className="hover:text-white transition-colors">
                  hello@ckm.studio
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                <span>123 Fashion St, Studio City, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400">
              &copy; {currentYear} CKM Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
