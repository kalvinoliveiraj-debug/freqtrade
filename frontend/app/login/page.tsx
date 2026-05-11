'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useAuth, useToast } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    login(email, password);
    addToast('Logged in successfully!', 'success');
    router.push('/account');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">Log In</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200 rounded-lg">
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:border-amber-500"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-bold">
                Sign up
              </Link>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <p className="text-sm text-blue-900">
              <strong>Demo:</strong> Use any email and password to log in. Your data is stored locally.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
