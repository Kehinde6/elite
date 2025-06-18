'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-serif font-bold text-[#8B4513] hover:text-[#A0522D] transition-colors">
                Elite
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium font-serif ${
                  pathname === '/'
                    ? 'border-amber-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium font-serif ${
                  pathname.startsWith('/products')
                    ? 'border-amber-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Products
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-[#8B4513] font-serif">Welcome, {session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-serif"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-base text-gray-500 hover:text-gray-700 font-serif"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-base text-gray-500 hover:text-gray-700 font-serif"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 