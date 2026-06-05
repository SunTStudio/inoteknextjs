import { Suspense } from "react";
import PemasanganClient from "./PemasanganClient";

export default async function Page(){
    return (
        <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-display font-bold mb-10 text-center text-[#013774] uppercase tracking-wide">
                Petunjuk Pemasangan
                </h1>
                <Suspense fallback={<div className="text-center py-10">Memuat menu...</div>}>
                    <PemasanganClient />
                </Suspense>
            </div>
        </section>
    )
}  