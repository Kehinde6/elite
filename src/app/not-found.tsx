'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">
          Please Sign In
        </h1>
        <p className="text-lg text-gray-600 font-serif">
          You need to be signed in to access this page.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
          >
            Sign In
          </button>
          <Link
            href="/"
            className="text-[#8B4513] hover:text-[#A0522D] font-serif"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 