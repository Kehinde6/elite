'use client';

import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-[#8B4513] hover:text-[#A0522D] transition-colors"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton; 