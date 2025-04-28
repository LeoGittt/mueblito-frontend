"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ShoppingCart,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active section
      const sections = ["lineas", "galeria", "pedidos", "contacto", "nosotros"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-beige/95 backdrop-blur-md shadow-lg py-2 border-b border-primary/10"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Image
              src="/images/logo.png"
              alt="Mueblito Logo"
              width={140}
              height={60}
              className={`h-10 sm:h-12 w-auto transition-all duration-300 ${
                scrolled ? "scale-90" : "scale-100"
              }`}
              priority
            />
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink
            href="#lineas"
            scrolled={scrolled}
            isActive={activeLink === "lineas"}
          >
            Nuestras Líneas
          </NavLink>
          <NavLink
            href="#galeria"
            scrolled={scrolled}
            isActive={activeLink === "galeria"}
          >
            Galería
          </NavLink>
          <NavLink
            href="#pedidos"
            scrolled={scrolled}
            isActive={activeLink === "pedidos"}
          >
            Pedidos
          </NavLink>
          <NavLink
            href="#contacto"
            scrolled={scrolled}
            isActive={activeLink === "contacto"}
          >
            Contacto
          </NavLink>
          <NavLink
            href="#nosotros"
            scrolled={scrolled}
            isActive={activeLink === "nosotros"}
          >
            Nosotros
          </NavLink>

          <Button
            asChild
            className={`ml-4 bg-primary hover:bg-primary-dark text-white transition-all duration-300 ${
              scrolled ? "scale-90 py-1" : "scale-100"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Catálogo
            </motion.div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-primary p-2 rounded-full bg-beige/20 backdrop-blur-sm"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X size={24} className="text-primary" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-beige/95 backdrop-blur-lg absolute w-full shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <MobileNavLink
                href="#lineas"
                onClick={toggleMenu}
                isActive={activeLink === "lineas"}
              >
                Nuestras Líneas
              </MobileNavLink>
              <MobileNavLink
                href="#galeria"
                onClick={toggleMenu}
                isActive={activeLink === "galeria"}
              >
                Galería
              </MobileNavLink>
              <MobileNavLink
                href="#pedidos"
                onClick={toggleMenu}
                isActive={activeLink === "pedidos"}
              >
                Pedidos
              </MobileNavLink>
              <MobileNavLink
                href="#contacto"
                onClick={toggleMenu}
                isActive={activeLink === "contacto"}
              >
                Contacto
              </MobileNavLink>
              <MobileNavLink
                href="#nosotros"
                onClick={toggleMenu}
                isActive={activeLink === "nosotros"}
              >
                Nosotros
              </MobileNavLink>

              <Button
                className="w-full bg-primary hover:bg-primary-dark text-white mt-4 py-3"
                onClick={() => {
                  document
                    .getElementById("catalogo")
                    ?.scrollIntoView({ behavior: "smooth" });
                  toggleMenu();
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Catálogo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  scrolled,
  children,
  isActive,
}: {
  href: string;
  scrolled: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link href={href} passHref>
      <motion.div
        className={`relative px-4 py-2 transition-all duration-300 ${
          scrolled ? "text-sm" : "text-base"
        }`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className={`transition-colors duration-300 ${
            isActive
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {children}
        </span>
        {isActive && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
            layoutId="navLinkUnderline"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
  isActive,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link href={href} passHref>
      <motion.div
        className={`py-3 px-4 rounded-lg transition-colors duration-200 text-lg ${
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
        }`}
        onClick={onClick}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
