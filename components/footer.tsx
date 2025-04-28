"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone, ArrowUp } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopRef.current) {
        if (window.scrollY > 500) {
          scrollToTopRef.current.classList.add("opacity-100", "translate-y-0")
          scrollToTopRef.current.classList.remove("opacity-0", "translate-y-10")
        } else {
          scrollToTopRef.current.classList.add("opacity-0", "translate-y-10")
          scrollToTopRef.current.classList.remove("opacity-100", "translate-y-0")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer ref={footerRef} className="w-full py-16 bg-primary text-white relative">
      <div
        ref={scrollToTopRef}
        className="fixed bottom-8 right-8 bg-primary hover:bg-primary-hover text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 opacity-0 translate-y-10 z-40"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-6 w-6" />
      </div>

      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-beige to-transparent"></div>
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#FAF8F2"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src="/images/logo.png"
              alt="Mueblito Logo"
              width={150}
              height={70}
              className="h-14 w-auto mb-6 invert"
            />
            <p className="text-white/80 text-center lg:text-left max-w-xs">
              Arte & Diseño en Mobiliario. <br />
              Creamos piezas únicas con pasión y dedicación que transforman espacios y conectan con quienes los habitan.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-xl font-medium mb-6">Enlaces Rápidos</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <FooterLink href="#lineas">Nuestras Líneas</FooterLink>
              <FooterLink href="#galeria">Galería</FooterLink>
              <FooterLink href="#catalogo">Catálogo</FooterLink>
              <FooterLink href="#pedidos">Pedidos</FooterLink>
              <FooterLink href="#contacto">Contacto</FooterLink>
              <FooterLink href="#nosotros">Sobre Nosotros</FooterLink>
            </div>
          </div>

          {/* Contacto y redes sociales */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-xl font-medium mb-6">Contacto</h3>
            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span className="text-sm sm:text-base">mueblitocodamuebles@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span className="text-sm sm:text-base">2644568079 / 3516964088</span>
              </div>
            </div>

            <h3 className="text-xl font-medium mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="https://facebook.com" icon={<Facebook className="h-5 w-5" />} />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-white/60">
          <p>© {new Date().getFullYear()} Mueblito / Art & Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-200 hover:scale-110 transform inline-block"
    >
      {icon}
    </Link>
  )
}
