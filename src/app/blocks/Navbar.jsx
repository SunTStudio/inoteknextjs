"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";

function NavbarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const menuRefs = useRef({});
  const [mobileDropdown, setMobileDropdown] = useState(null);

  useEffect(() => {
    const applyOffset = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--nav-offset",
          h + 8 + "px"
        );
      }
    };
    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => window.removeEventListener("resize", applyOffset);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const h = navRef.current.offsetHeight;
    document.documentElement.style.setProperty("--nav-offset", h + 8 + "px");
  }, [isOpen]);

  const menus = [
    {
      label: "PROFIL",
      path: "/companyprofile",
      children: [
        {
          label: "Tentang Kami",
          path: "/companyprofile#tentang-kami",
        },
        { label: "Visi & Misi", path: "/companyprofile#visimisi" },
        { label: "Distribusi", path: "/companyprofile#jangkauan-distribusi" },
      ],
    },
    {
      label: "NICHIHA",
      path: "/nichiha",
      children: [
        { label: "Produk", path: "/nichiha" },
        { label: "Galeri Proyek", path: "/galeri?category=nichiha" },
        { label: "Pemasangan", path: "/pemasangan?category=nichiha" },
      ],
    },
    {
      label: "LUUM",
      path: "/luum",
      children: [
        { label: "Produk", path: "/luum" },
        { label: "Galeri Proyek", path: "/galeri?category=luum" },
        { label: "Pemasangan", path: "/pemasangan?category=luum" },
      ],
    },
    {
      label: "ARTIKEL",
      path: "/artikel",
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMouseEnter = (menu) => {
    if (menu.children && menuRefs.current[menu.path]) {
      const rect = menuRefs.current[menu.path].getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left,
        top: navRect.bottom + 8,
      });
      setActiveDropdown(menu.path);
    }
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 left-0 w-full z-50 bg-white text-[#013774]"
    >
      <div className="content mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <img
            src="/headerfootelogo.png"
            alt="Inotek Karya Mandiri"
            className="lg:h-10 h-8"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex md:space-x-8 font-display text-lg">
          {menus.map((menu) => (
            <motion.li
              key={menu.path}
              ref={(el) => (menuRefs.current[menu.path] = el)}
              onMouseEnter={() => handleMouseEnter(menu)}
              onMouseLeave={() => setActiveDropdown(null)}
              whileHover={{ color: "#0253AE" }}
              transition={{
                duration: 0.2,
                ease: "easeIn",
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Link
                href={menu.path}
                className={`flex items-center ${
                  pathname === menu.path
                    ? "text-[#0253AE] font-bold"
                    : "hover:text-[#0253AE]"
                }`}
              >
                {menu.label}
                {menu.children && (
                  <IoIosArrowDown
                    className={`inline ml-1 transition-transform duration-200 ${
                      activeDropdown === menu.path ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Button Desktop */}
        <Link href="/contactform" className="hidden lg:block">
          <motion.div
            className="rounded-xl font-display font-bold py-2 px-4 text-lg tracking-widest text-white bg-[#0F8F36] cursor-pointer text-center"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#074D1D",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            HUBUNGI KAMI
          </motion.div>
        </Link>

        {/* Hamburger (Mobile) */}
        <button className="lg:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Menu - Fixed positioning */}
      <AnimatePresence>
        {activeDropdown &&
          menus.find((m) => m.path === activeDropdown)?.children && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: -10 }}
              animate={{ opacity: 1, y: -30, x: -10 }}
              exit={{ opacity: 0, y: -50, x: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed z-60"
              style={{
                left: `${dropdownPosition.left}px`,
                top: `${dropdownPosition.top}px`,
              }}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <ul className="w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
                {menus
                  .find((m) => m.path === activeDropdown)
                  ?.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        href={child.path}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#0253AE]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50"
            style={{
              maxHeight: "calc(100vh - 4.5rem)",
              overflowY: "auto",
            }}
          >
            <ul className="flex flex-col items-center space-y-4 py-6 font-display text-lg font-medium overflow-hidden">
              {menus.map((menu) => (
                <motion.li
                  key={menu.path}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Link
                        href={menu.path}
                        onClick={() => !menu.children && setIsOpen(false)}
                        className={`${
                          pathname === menu.path
                            ? "text-[#0253AE] font-semibold border-b-2 border-[#0253AE]"
                            : "hover:text-[#0253AE]"
                        }`}
                      >
                        {menu.label}
                      </Link>
                      {menu.children && (
                        <button
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === menu.path ? null : menu.path
                            )
                          }
                          className="text-[#013774] hover:text-[#0253AE]"
                        >
                          <IoIosArrowDown
                            className={`transition-transform duration-200 ${
                              mobileDropdown === menu.path ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown for children */}
                    <AnimatePresence>
                      {menu.children && mobileDropdown === menu.path && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 space-y-2 overflow-hidden"
                        >
                          {menu.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                href={child.path}
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-600 hover:text-[#0253AE] block py-1"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="block rounded-xl font-display font-bold py-2 px-4 text-lg tracking-widest text-white bg-[#0F8F36] cursor-pointer text-center"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href="/contactform" className="w-full h-full block">
                    HUBUNGI KAMI
                  </Link>
                </motion.div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarHeader;
