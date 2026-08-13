"use client";
import React, { use } from "react";

function HeroSection() {
  return (
    <section className="content flex flex-col font-display justify-center lg:py-16 gap-3">
      <h2 className="text-lg md:text-2xl md:text-left text-center font-bold text-[#0253AE]">
        PT INOTEK KARYA MANDIRI : MAKES LIVING SIMPLE
      </h2>
      <p className="text-justify text-sm flex flex-col gap-5 md:text-[16px]">
        <span>
          Kami dipercaya sebagai{" "}
          <span className="font-bold">distributor resmi nasional NICHIHA</span>,
          produk{" "}
          <span className="font-bold">wall panel modern asal Jepang </span>
          yang telah terbukti unggul dalam kualitas dan inovasi. Lebih dari
          sekadar pelindung bangunan, sistem panel fasad NICHIHA merupakan karya
          arsitektur yang menghadirkan estetika serta meningkatkan nilai hunian
          dan bangunan. Dengan filosofi
          <span className="font-bold"> “Makes Living Simple”</span>, Inotek
          bersama NICHIHA menyediakan solusi fasad yang praktis, kuat, dan
          indah, sehingga memudahkan arsitek, kontraktor, hingga pemilik rumah
          dalam mewujudkan fasad terbaik. Dedikasi kami sebagai distributor
          mendukung terwujudnya proyek-proyek unggulan di seluruh Indonesia,
          mulai dari hunian premium hingga gedung komersial berkelas.
        </span>
      </p>
    </section>
  );
}
export default HeroSection;
