"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function CatalogDownload() {
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentRef.current?.classList.add("opacity-100", "translate-y-0")
            contentRef.current?.classList.remove("opacity-0", "translate-y-20")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (contentRef.current) {
      contentRef.current.classList.add("opacity-0", "translate-y-20")
      contentRef.current.classList.add("transition-all", "duration-1000", "ease-out")
      observer.observe(contentRef.current)
    }

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [])

  const handleDownload = () => {
    // En una implementación real, aquí iría la lógica para descargar el catálogo
    alert("Descargando catálogo...")
  }

  return (
    <section id="catalogo" ref={sectionRef} className="w-full py-16 md:py-24 bg-beige relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>

      <div className="container mx-auto px-4">
        <div ref={contentRef} className="bg-gradient-soft rounded-3xl p-6 md:p-12 shadow-lg max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary mb-4">
                Descarga Nuestro Catálogo
              </h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestra colección completa de diseños, materiales y acabados en nuestro catálogo digital.
              </p>
              <Button
                className="catalog-btn bg-primary hover:bg-primary-hover text-white px-6 sm:px-8 py-4 sm:py-6 h-auto text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto md:mx-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleDownload}
              >
                <Download
                  className={`h-5 w-5 transition-transform duration-300 ${isHovering ? "translate-y-1" : ""}`}
                />
                Descargar Catálogo
              </Button>
            </div>

            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="relative w-full max-w-xs mx-auto md:max-w-none aspect-[3/4] transform rotate-3 hover-lift">
                <Image
                  src="/images/catalog-cover.png"
                  alt="Catálogo Mueblito"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
