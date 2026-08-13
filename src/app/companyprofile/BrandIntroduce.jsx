"use client";

import React from "react";
import { motion } from "motion/react";

function BrandIntroduce() {
  return (
    <section className="content font-display py-6 md:py-10">
      <div className=" w-full mb-10">
        <h3 className="text-[#00408A] font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
          Dua Brand, Satu Pilihan
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          <strong>INOTEK</strong> memperluas peran sebagai distributor resmi nasional untuk material bangunan premium — tidak hanya menutup fasad luar dengan NICHIHA <i>wall panel exterior</i>, tapi kini juga menghadirkan LUUM SMC <i>Ceiling Panel</i> untuk menyempurnakan interior bangunan. Satu mitra pengadaan, dua merek kualitas dunia.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
        {/* Card 1: NICHIHA */}
        <motion.div
          className="bg-[#EAEAEA] border-[6px] border-[#008B47] rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="h-16 md:h-20 flex items-center justify-center mb-6 w-full">
            <img
              src="/images/nichiha_logo.png"
              alt="NICHIHA Logo"
              className="max-h-full max-w-[80%] object-contain"
            />
          </div>
          <h4 className="font-bold text-lg md:text-xl text-[#008B47] mb-3">
            NICHIHA - Eksterior Wall Panel
          </h4>
          <p className="text-sm md:text-base text-[#008B47] leading-relaxed font-medium">
            Panel dinding berbahan fiber semen dari Jepang, kuat dan mudah dirawat untuk bangunan premium.
          </p>
        </motion.div>

        {/* Card 2: LUUM */}
        <motion.div
          className="bg-[#EAEAEA] border-[6px] border-[#0072BC] rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="h-16 md:h-20 flex items-center justify-center mb-6 w-full">
            <img
              src="/images/luum_logo.png"
              alt="LUUM Logo"
              className="max-h-full max-w-[80%] object-contain"
            />
          </div>
          <h4 className="font-bold text-lg md:text-xl text-[#0072BC] mb-3">
            LUUM - SMC Ceiling Panel
          </h4>
          <p className="text-sm md:text-base text-[#0072BC] leading-relaxed font-medium">
            Panel plafon premium berbahan SMC dari Korea, <i>waterproof</i> dan tahan lama.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default BrandIntroduce;