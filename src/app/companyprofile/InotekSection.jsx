"use client";

import React from "react";
import { motion } from "motion/react";

function InotekSection() {
  return (
    <section
      id="budaya"
      className="content bg-[#00408A] w-full flex flex-col justify-center lg:min-h-screen py-24 lg:py-0"
    >
      <motion.img
        src="/images/NilaiBudayaHorizontal.png"
        alt="Nilai Budaya"
        className="mx-auto object-cover hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      />
      <motion.img
        src="/images/NilaiBudayaVertical.png"
        alt="Nilai Budaya"
        className="mx-auto object-cover block md:hidden"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 10 }}
      />
    </section>
  );
}

export default InotekSection;
