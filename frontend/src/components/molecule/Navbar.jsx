

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LoginButton from "../atom/LoginButton";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      title: "Products",
      menu: [
        {
          title: "Issuance",
          desc: "Issue any asset on Bitcoin",
          path: "/products/issuance",
        },
        {
          title: "Wallets",
          desc: "Create next-gen wallets",
          path: "/products/wallets",
        },
        {
          title: "Stablechange",
          desc: "Coming Q4 2025",
          path: "/products/stablechange",
        },
      ],
    },
    {
      title: "Build",
      menu: [
        {
          title: "Developer API",
          desc: "Integrate payments quickly",
          path: "/build/api",
        },
        { title: "SDKs", desc: "Ready-to-use SDKs", path: "/build/sdk" },
      ],
    },
    {
      title: "Resources",
      menu: [
        {
          title: "Blog",
          desc: "Latest news & tutorials",
          path: "/resources/blog",
        },
        {
          title: "Docs",
          desc: "Complete documentation",
          path: "/resources/docs",
        },
        {
          title: "Guides",
          desc: "Step-by-step guides",
          path: "/resources/guides",
        },
      ],
    },
    {
      title: "Get in touch",
      menu: [
        { title: "Contact", desc: "Reach out to us", path: "/contact" },
        { title: "Support", desc: "24/7 support", path: "/support" },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16 text-white">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-tight">*Sandbox</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer hover:text-white/80"
              onMouseEnter={() => setOpenDropdown(idx)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.title}
              <AnimatePresence>
                {openDropdown === idx && <DropdownMenu menu={item.menu} />}
              </AnimatePresence>
            </li>
          ))}
          <li>
            <div className="bg-white text-black font-medium px-4 py-1 rounded-md hover:bg-neutral-300 transition">
              <LoginButton />
            </div>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {/* <div className="bg-white text-black font-medium px-4 py-1 rounded-md hover:bg-neutral-300 transition">
            <LoginButton />
          </div> */}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/90 backdrop-blur-sm border-t border-white/10 text-white flex flex-col px-6 py-4 gap-4"
          >
            {navItems.map((item, idx) => (
              <li key={idx} className="flex flex-col">
                <span className="font-medium">{item.title}</span>
                <ul className="flex flex-col ml-4 mt-1 gap-1">
                  {item.menu.map((menuItem, i) => (
                    <li key={i}>
                      <Link
                        to={menuItem.path}
                        className="text-sm text-white/70 hover:text-white transition"
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DropdownMenu = ({ menu }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-6 left-0 bg-black backdrop-blur-2xl z-50  p-4 rounded-2xl border border-white/20 w-60 mt-6 "
    >
      {menu.map((item, i) => (
        <Link key={i} to={item.path}>
          <div className="p-2 hover:bg-white/10 rounded-md transition cursor-pointer ">
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-white/60">{item.desc}</div>
          </div>
        </Link>
      ))}
    </motion.div>
  );
};

export default Navbar;
