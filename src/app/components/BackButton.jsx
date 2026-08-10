"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton({
  href = "/product",
  label = "Kembali ke Produk",
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="self-start"
    >
      <Link
        href={href}
        className="flex items-center gap-2 text-[#0253AE] font-medium"
      >
        <FaArrowLeft />
        {label}
      </Link>
    </motion.button>
  );
}
