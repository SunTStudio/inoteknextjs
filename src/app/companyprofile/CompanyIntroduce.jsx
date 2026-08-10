"use client";

import React from "react";
import { List, ListItem, createTheme } from "flowbite-react";
import { FaCircle } from "react-icons/fa";
import { motion } from "motion/react";

function CompanyIntroduce() {
  4;

  const lisTheme = createTheme({
    icon: "me-2 h-2 w-2",
  });

  return (
    <section
      className="content flex flex-col font-display justify-center md:pt-16 gap-3"
      id="tentang-kami"
    >
      <div className="space-y-4 text-justify text-sm md:text-base">
        <h3 className="text-[#00408A] font-bold text-2xl md:text-3xl lg:text-4xl mb-4">PT INOTEK KARYA MANDIRI : MAKES LIVING SIMPLE</h3>
        <p>
          PT Inotek Karya Mandiri adalah distributor resmi nasional untuk material premium di bidang bangunan dan interior. Kami dipercaya sebagai distributor resmi NICHIHA Exterior Wall Panel dari Jepang dan LUUM Premium SMC Ceiling Panel dari Korea.
        </p>
        <p>
        Kami percaya bahwa setiap elemen bangunan—baik pada fasad maupun ruang interior—tidak hanya berfungsi sebagai pelindung, tetapi juga merepresentasikan karakter dan gaya hidup penggunanya. Karena itu, kami menghadirkan produk berkualitas tinggi yang memadukan inovasi, estetika, ketahanan, dan kemudahan pemasangan.
                </p>
                <p>
                  NICHIHA Exterior Wall Panel menawarkan sistem panel fasad berteknologi tinggi dari Jepang, dikenal akan desain autentik, ketahanan terhadap cuaca, perawatan minimal, dan kualitas finishing yang konsisten. Sementara itu, LUUM menghadirkan solusi plafon modern berbahan SMC (Sheet Molding Compound) yang mengutamakan kualitas, daya tahan, dan estetika untuk berbagai jeanis bangunan.
                </p>
                <p>
                  Didukung jaringan distribusi nasional, tim profesional, serta layanan konsultasi produk dan teknis, PT Inotek Karya Mandiri berkomitmen menjadi mitra terpercaya bagi arsitek, desainer interior, kontraktor, developer, dan pemilik bangunan dalam mewujudkan proyek yang berkualitas, inovatif, dan berkelanjutan.
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[30vh]">
        <motion.div
          className="bg-gray-100 p-4 rounded-xl flex flex-col h-full border border-[#0253AE] drop-shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        >
          <h3 className="font-semibold text-[#0253AE] mb-2 md:text-2xl text-xl ">
            PT. Inotek Karya Mandiri siap membantu Anda dengan layanan terbaik :
          </h3>
          <List className="mx-4 text-[#0253AE] md:text-xl text-lg">
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>Tim Distrubutor dan Customer Service yang profesional</p>
            </ListItem>
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>Layanan distribusi nasional dengan jangkauan se-Indonesia</p>
            </ListItem>
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>
                Komitmen untuk menghadirkan produk Jepang dengan kualitas
                premium
              </p>
            </ListItem>
          </List>
        </motion.div>
        <motion.div
          className="bg-gray-100 p-4 rounded-xl flex flex-col h-full border border-[#0253AE] drop-shadow-lg"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        >
          <h3 className="font-semibold text-[#0253AE] mb-2 md:text-2xl text-xl">
            Nichiha Wall Panel menjadi solusi fasad yang mengedepankan:
          </h3>
          <List className="mx-4 text-[#0253AE] md:text-xl text-lg">
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>
                Teknologi praktis dan berkualitas untuk manufaktur dan sistem
                pemasangan
              </p>
            </ListItem>
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>
                Desain fasad modern yang sesuai dengan selera arsitektur tropis
                dan urban
              </p>
            </ListItem>
            <ListItem icon={FaCircle} theme={lisTheme} className=" flex gap-1">
              <p>
                Daya tahan terhadap iklim ekstrem, cocok untuk kondisi cuaca di
                Indonesia
              </p>
            </ListItem>
          </List>
        </motion.div>
      </div>
      <div className="space-y-4 text-justify text-sm md:text-base">
        <p>
          Nichiha berdedikasi untuk turut berkontribusi dalam proyek-proyek
          bangunan terbaik di seluruh Indonesia, dari hunian premium hingga
          gedung komersial berkelas.
        </p>
      </div> */}
    </section>
  );
}

export default CompanyIntroduce;
