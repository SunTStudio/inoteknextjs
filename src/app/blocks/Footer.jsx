import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#E5E5E5] py-12 md:py-16 font-display">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Top Row: Logos & Slogan */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-8 mb-10 gap-6">
          {/* Left Side: INOTEK Logo & Company Info */}
          <div className="space-y-4">
            <img
              src="/headerfootelogo.png"
              alt="PT Inotek Karya Mandiri Logo"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h2 className="text-lg font-bold text-[#013774]">
                PT INOTEK KARYA MANDIRI
              </h2>
              <p className="text-[#013774] font-semibold text-sm">
                Distributor Resmi Nasional NICHIHA dan LUUM di Indonesia
              </p>
            </div>
          </div>

          {/* Right Side: Partner Logos & Slogan */}
          <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
            <div className="flex items-center gap-6">
              <img
                src="/images/nichiha_logo.png"
                alt="Nichiha Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <img
                src="/images/luum_logo.png"
                alt="LUUM Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-[#013774] font-display italic font-bold text-2xl lg:text-3xl tracking-wide mt-2">
              Makes Living Simple
            </p>
          </div>
        </div>

        {/* Bottom Row: 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Kantor Pusat */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#013774] uppercase tracking-wider">
              Kantor Pusat
            </h3>
            <div className="flex items-start gap-3">
              <div className="bg-[#013774] p-1.5 rounded flex items-center justify-center shrink-0 w-7 h-7 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                Jl. Kenanga, Maguwoharjo, Depok, Sleman, Yogyakarta
              </p>
            </div>
          </div>

          {/* Column 2: Showroom */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#013774] uppercase tracking-wider">
              Showroom
            </h3>
            <div className="flex items-start gap-3">
              <div className="bg-[#013774] p-1.5 rounded flex items-center justify-center shrink-0 w-7 h-7 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                Rukan Crown Jl. Green Lake City Boulevard, Cipondoh, Kota Tangerang, Banten
              </p>
            </div>
          </div>

          {/* Column 3: Kontak */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#013774] uppercase tracking-wider">
              Kontak
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#013774] p-1.5 rounded flex items-center justify-center shrink-0 w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622 2.25 12c0 5.385 4.365 9.75 9.75 9.75h1.38c.83 0 1.5-.67 1.5-1.5v-1.272a2.25 2.25 0 0 0-.522-1.455l-1.157-1.41a2.25 2.25 0 0 0-3.178-.073l-1.058 1.057a11.3 11.3 0 0 1-5.347-5.347l1.057-1.058a2.25 2.25 0 0 0-.073-3.178l-1.41-1.157A2.25 2.25 0 0 0 7.893 2.25H6.622a2.25 2.25 0 0 0-2.25 2.25Z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700 font-semibold">08516884 2909</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#013774] p-1.5 rounded flex items-center justify-center shrink-0 w-7 h-7">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700 font-semibold break-all">info@inotekkaryamandiri.com</p>
              </div>
            </div>
          </div>

          {/* Column 4: Sosial Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#013774] uppercase tracking-wider">
              Sosial Media
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-700 font-semibold">
              <li>
                <Link
                  href="https://www.instagram.com/inotek_nichiha/"
                  className="hover:text-[#013774] transition-colors"
                  target="_blank"
                >
                  Inotek_nichiha
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61582034552515"
                  className="hover:text-[#013774] transition-colors"
                  target="_blank"
                >
                  PT Inotek Karya Mandiri
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.inotekkaryamandiri.com"
                  className="hover:text-[#013774] transition-colors"
                  target="_blank"
                >
                  www.inotekkaryamandiri.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Produk */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#013774] uppercase tracking-wider">
              Produk
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-700 font-semibold">
              <li>
                <Link href="/nichiha" className="hover:text-[#013774] transition-colors">
                  Nichiha EX Series
                </Link>
              </li>
              <li>
                <Link href="/luum" className="hover:text-[#013774] transition-colors">
                  LUUM Ceiling Panel
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-[#013774] transition-colors">
                  Download Katalog Digital
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-12 pt-4 text-center">
          <p className="text-xs text-gray-600">
            © 2026 PT Inotek Karya Mandiri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
