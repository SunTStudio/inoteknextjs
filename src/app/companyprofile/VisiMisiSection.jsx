"use client";

import React from "react";
import { List, ListItem } from "flowbite-react";
import { FaCircle, FaLightbulb, FaBullseye } from "react-icons/fa";
import VisiMisiCard from "../components/VisiMisiCard";
import { motion } from "motion/react";

function VisiMisiSection() {
  const misiList = {
    [1]: "Menyediakan produk material bangunan berkualitas tinggi dengan teknologi terbaik",
    [2]: "Mengedepankan desain modern yang sesuai tren arsitektur",
    [3]: "Memberikan layanan distribusi profesional dan responsif",
    [4]: "Menjalin kemitraan jangka panjang dengan arsitek, developer, dan kontraktor",
    [5]: "Berkomitmen pada keberlanjutan dan nilai tambah bangunan",
  };

  return (
    <section
      id="visimisi"
      className="content grid grid-cols-1 lg:grid-cols-2 gap-10 py-12"
    >
      <motion.div
        className="h-full"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      >
        <VisiMisiCard
          title="Visi"
          textAlign="text-center"
          icon={<FaLightbulb className="w-8 h-8" />}
        >
          <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed max-w-md mx-auto py-6">
            "Menjadi perusahaan distribusi terdepan dalam penyediaan material bangunan inovatif dan berestetika di Indonesia."
          </p>
        </VisiMisiCard>
      </motion.div>

      <motion.div
        className="h-full"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      >
        <VisiMisiCard 
          title="Misi"
          icon={<FaBullseye className="w-8 h-8" />}
        >
          <List className="list-disc list-inside space-y-4">
            {Object.entries(misiList).map(([key, value]) => (
              <ListItem
                key={key}
                icon={FaCircle}
                theme={{ icon: "me-3 mt-2 h-2 w-2 text-[#0253AE]" }}
                className="text-gray-600 flex items-start gap-1"
              >
                <p className="text-base md:text-lg leading-relaxed">{value}</p>
              </ListItem>
            ))}
          </List>
        </VisiMisiCard>
      </motion.div>
    </section>
  );
}

export default VisiMisiSection;
