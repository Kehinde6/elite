'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

interface ExternalLink {
  id: string;
  retailer: string;
  url: string;
  price: number;
  deliveryTime?: string;
  returnPolicy?: string;
}

interface Comment {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand?: string;
  category: string;
  specifications?: {
    caseMaterial?: string;
    caseSize?: string;
    movement?: string;
    waterResistance?: string;
    powerReserve?: string;
    features?: string[];
    crystal?: string;
    dialType?: string;
    diamondDetails?: {
      type?: string;
      setting?: string;
      weight?: string;
      cut?: string;
      shape?: string;
      clarity?: string;
      color?: string;
    };
  };
  externalLinks: ExternalLink[];
  comments: Comment[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({ content: '', rating: 5 });
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productRes, linksRes, commentsRes] = await Promise.all([
          fetch(`/api/products/${params.id}`),
          fetch(`/api/products/${params.id}/links`),
          fetch(`/api/products/${params.id}/comments`),
        ]);

        if (!productRes.ok) {
          throw new Error('Failed to fetch product');
        }

        const [productData, linksData, commentsData] = await Promise.all([
          productRes.json(),
          linksRes.json(),
          commentsRes.json(),
        ]);

        setProduct(productData);
        setExternalLinks(linksData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, status, router]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setSubmitError('');
    setIsSubmitting(true);

    if (!newComment.content.trim()) {
      setSubmitError('Please enter your comment');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/products/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.content.trim(),
          rating: newComment.rating
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to post comment');
      }

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment({ content: '', rating: 5 });
      setSubmitError('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to sign-in page
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/products"
            className="text-amber-800 hover:text-amber-900 font-medium"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative h-[600px] md:h-[800px] -mt-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              )}
              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price.toLocaleString()}
              </p>
              <div className="prose prose-amber max-w-none mb-8">
                <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              </div>

              {product.externalLinks && product.externalLinks.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Available Retailers</h2>
                  <div className="space-y-4">
                    {product.externalLinks
                      .sort((a, b) => a.price - b.price)
                      .map((link, index) => (
                        <div
                          key={link.id}
                          className={`p-4 rounded-lg ${
                            index === 0 
                              ? 'border-2 border-[#FFD700] bg-white shadow-lg'
                              : 'border border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium">{link.retailer}</h3>
                              <p className="text-gray-600">{link.deliveryTime}</p>
                              <p className="text-sm text-gray-500">{link.returnPolicy}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-xl font-bold ${index === 0 ? 'text-[#8B4513]' : 'text-gray-900'}`}>
                                ${link.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#A0522D] transition-colors"
                              >
                                Buy Now
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {status === 'authenticated' && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Add a Comment
                  </h2>
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div>
                      <textarea
                        value={newComment.content}
                        onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Share your thoughts about this product..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">Rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewComment(prev => ({ ...prev, rating }))}
                            className="focus:outline-none"
                          >
                            <StarIcon
                              className={`w-6 h-6 ${
                                rating <= newComment.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                  </form>
                </div>
              )}

              {comments.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Comments
                  </h2>
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                          <span className="font-medium">{comment.name}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center ml-4">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-5 h-5 ${
                                  i < comment.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 