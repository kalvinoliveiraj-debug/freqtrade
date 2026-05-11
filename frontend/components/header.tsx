'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            CKM <span className="text-amber-500">Studio</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="hover:text-amber-500 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-amber-500 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Shopping Cart */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-neutral-200">
            <Link
              href="/shop"
              className="block py-2 px-0 hover:text-amber-500"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block py-2 px-0 hover:text-amber-500"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 px-0 hover:text-amber-500"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
