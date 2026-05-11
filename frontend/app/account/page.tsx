'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useAuth, useToast } from '@/lib/hooks';
import { useState } from 'react';

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-fluid text-center">
            <h1 className="text-4xl font-bold mb-4">My Account</h1>
            <p className="text-neutral-600 mb-8">Please log in to view your account</p>
            <Link href="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="text-sm text-neutral-600 mb-2">Logged in as</p>
                <p className="font-bold mb-8">{user?.email}</p>

                <nav className="space-y-2">
                  {['profile', 'orders', 'wishlist', 'addresses', 'settings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-2 rounded capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-amber-500 text-white'
                          : 'hover:bg-neutral-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>

                <button
                  onClick={handleLogout}
                  className="w-full mt-8 px-4 py-2 border border-neutral-200 rounded hover:bg-neutral-100"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white p-8 rounded-lg border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-600">Email</p>
                      <p className="font-semibold">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Name</p>
                      <p className="font-semibold">{user?.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white p-8 rounded-lg border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  {user?.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="border p-4 rounded hover:bg-neutral-50">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold">{order.id}</span>
                            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded capitalize">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-neutral-600">{order.date}</p>
                          <p className="font-bold mt-2">Total: ${order.total.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-600">No orders yet</p>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white p-8 rounded-lg border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  <p className="text-neutral-600">
                    View your saved items <Link href="/wishlist" className="text-amber-600">here</Link>
                  </p>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white p-8 rounded-lg border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                  {user?.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((addr) => (
                        <div key={addr.id} className="border p-4 rounded">
                          <p className="font-bold">{addr.name}</p>
                          <p className="text-neutral-600">{addr.street}</p>
                          <p className="text-neutral-600">{addr.city}, {addr.state} {addr.zip}</p>
                          {addr.isDefault && (
                            <p className="text-sm text-green-600 mt-2">✓ Default Address</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-600">No saved addresses</p>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white p-8 rounded-lg border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      Subscribe to newsletter
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      Receive promotional emails
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      Receive SMS notifications
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
