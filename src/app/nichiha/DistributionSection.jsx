"use client";

import React from "react";
import { motion } from "motion/react";

function ClosingSection() {
  return (
    <section id="jangkauan-distribusi" className="content w-full flex flex-col lg:py-24 py-16 space-y-4 font-display">
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      >
        <img
          src="/images/jangkauan-distribusi.png"
          alt="Jangkauan distribusi"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      >
        <h2 className="md:text-2xl text-lg md:text-left text-center font-bold text-[#0253AE]">
          Jangkauan Distribusi
        </h2>
        <p className="text-justify text-sm md:text-base">
          <span className="font-bold">PT Inotek Karya Mandiri</span> hadir
          sebagai distributor resmi nasional Nichiha dan LUUM, dengan jaringan distribusi
          yang luas dan terintegrasi di seluruh Indonesia. Didukung oleh tim
          profesional dan sistem logistik yang handal, kami memastikan setiap
          proyek dapat memperoleh akses terhadap produk{" "}
          <span className="font-bold">wall panel premium dari Jepang dan LUUM Premium SMC Ceiling Panel dari Korea</span>{" "}
          dengan kualitas dan layanan terbaik.
        </p>
      </motion.div>
    </section>
  );
}

export default ClosingSection;
