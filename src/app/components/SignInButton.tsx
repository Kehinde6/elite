import Link from 'next/link';

const SignInButton = () => {
  return (
    <Link
      href="/login"
      className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors"
    >
      Sign In
    </Link>
  );
};

export default SignInButton; 