"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GaleriV2 from "../galeri/GaleriV2";

function GaleriV2Content() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "nichiha";

  return (
    <div className="container mx-auto px-4 py-8">
      <GaleriV2 category={category} />
    </div>
  );
}

export default function GaleriV2Page() {
  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
      <Suspense fallback={<div className="text-center py-12">Memuat galeri...</div>}>
        <GaleriV2Content />
      </Suspense>
    </section>
  );
}
