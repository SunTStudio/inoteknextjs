"use client";
import React from "react";
import { HR } from "flowbite-react";
import BackButton from "@/app/components/BackButton";

export default function SingelProduct({ product }) {
  if (!product) {
    return <p className="text-center text-gray-500">Memuat produk...</p>;
  }

  return (
    <div className="md:w-[60vw] w-[90vw] mx-auto my-10 flex flex-col gap-6">
      <BackButton />
      <div className="p-6 flex flex-col font-display border-t border-s border-gray-300 shadow-[8px_8px_16px_rgba(0,0,0,0.15)] rounded-2xl">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {/* Header Image */}
          <img
            src={product.headerImage}
            alt={product.product}
            className="rounded-2xl w-full object-cover"
          />

          {/* Detail */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex gap-2">
                <div>
                  <p>Size</p>
                  <p>Weight</p>
                  <p>Packaging</p>
                </div>
                <div>
                  <p>: {product.size}</p>
                  <p>: {product.weight}</p>
                  <p>: {product.packaging}</p>
                </div>
              </div>
              <HR className="my-4 bg-gray-600" />
            </div>

            {/* Product Specs Images */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 relative">
              {product.specifications?.map((spec, index) => (
                <div key={index} className="flex justify-center group">
                  <img
                    src={spec.url}
                    alt={spec.caption}
                    className="w-full object-cover mx-auto"
                  />
                  <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {spec.caption}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <HR className="my-6 bg-gray-600" />
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-medium tracking-wide">Varian Produk</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {product.colours?.map((variant) => (
              <div key={variant.id} className="flex flex-col items-center">
                <img
                  src={variant.url}
                  alt={variant.caption}
                  className="rounded-lg h-24 w-full object-cover"
                />
                <p className="mt-2 text-center">{variant.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
