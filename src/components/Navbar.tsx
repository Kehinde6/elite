'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-serif text-[#8B4513] hover:text-[#A0522D] transition-colors">
                Elite
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'border-[#8B4513] text-[#8B4513]'
                    : 'border-transparent text-gray-500 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors'
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/products'
                    ? 'border-[#8B4513] text-[#8B4513]'
                    : 'border-transparent text-gray-500 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors'
                }`}
              >
                Products
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  Welcome, {session?.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-amber-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-900"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 