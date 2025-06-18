import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">About Elite</h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Your premier destination for authentic luxury products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="relative h-96">
            <Image
              src="/images/about-luxury.jpg"
              alt="Luxury Store Interior"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6">
              Founded with a passion for luxury and a commitment to authenticity, Elite has become
              a trusted name in the world of high-end retail. We curate only the finest products
              from the most prestigious brands, ensuring that our clients receive nothing but the
              best.
            </p>
            <p className="text-gray-600">
              Our team of experts carefully verifies each item's authenticity and condition,
              providing you with complete peace of mind when making your purchase. We believe
              that luxury should be accessible, which is why we offer competitive prices without
              compromising on quality.
            </p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Authenticity Guaranteed</h4>
            <p className="text-gray-600">Every item is thoroughly verified by our expert team.</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h4>
            <p className="text-gray-600">Swift and secure shipping worldwide.</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Secure Shopping</h4>
            <p className="text-gray-600">Safe and encrypted transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 