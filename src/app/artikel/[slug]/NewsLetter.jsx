"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ArrowRightLongIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-[25px] h-[25px] text-[#0253AE]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
    />
  </svg>
);

export default function NewsLetter() {
  const [useremail, setEmail] = useState("");

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!useremail) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { useremail } }),
      });
      if (!res.ok) {
        throw new Error("Gagal mengirim email");
      }
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-50 min-w-[300px]">
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-100 shadow-lg"
              role="alert"
            >
              <FaCheckCircle className="shrink-0 inline w-5 h-5 mr-3 text-green-500" />
              <div>
                <span className="font-medium">Berhasil!</span> Terimakasih telah
                berlangganan.
              </div>
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100 shadow-lg"
              role="alert"
            >
              <FaTimesCircle className="shrink-0 inline w-5 h-5 mr-3 text-red-500" />
              <div>
                <span className="font-medium">Gagal!</span> Silakan coba
                beberapa saat lagi.
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <section className="content flex flex-col items-center justify-center mb-10 min-h-[70vh] font-display gap-26 px-4">
        <div className="flex flex-col items-center text-center mb-6 gap-4">
          <h3 className="text-center text-4xl font-semibold text-[#0253AE]">
            Subscribe to our Newsletter
          </h3>
          <p className="text-gray-600 w-full md:max-w-[70%] md:text-lg text-sm">
            Dapatkan informasi terbaru, artikel, dan sumber daya yang dikirimkan
            langsung ke kotak masuk Anda setiap minggunya.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex border-b-2 border-[#0253AE] p-2"
        >
          {/* Menghubungkan input dengan state 'email' */}
          <input
            type="email"
            id="newslettermail"
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan alamat email Anda"
            className="border-none outline-none flex-1 text-[#0253AE] placeholder:text-[#0253AE] font-medium bg-transparent"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            <ArrowRightLongIcon />
          </motion.button>
        </form>
      </section>
    </>
  );
}
