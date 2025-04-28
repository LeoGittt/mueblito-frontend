"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === cardRef.current) {
              entry.target.classList.add("opacity-100", "scale-100")
              entry.target.classList.remove("opacity-0", "scale-95")
            } else if (entry.target === textRef.current) {
              entry.target.classList.add("opacity-100", "translate-x-0")
              entry.target.classList.remove("opacity-0", "-translate-x-20")
            } else if (entry.target === imageRef.current) {
              entry.target.classList.add("opacity-100", "translate-x-0")
              entry.target.classList.remove("opacity-0", "translate-x-20")
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      cardRef.current.classList.add("opacity-0", "scale-95")
      cardRef.current.classList.add("transition-all", "duration-1000", "ease-out")
      observer.observe(cardRef.current)
    }

    if (textRef.current) {
      textRef.current.classList.add("opacity-0", "-translate-x-20")
      textRef.current.classList.add("transition-all", "duration-700", "ease-out")
      observer.observe(textRef.current)
    }

    if (imageRef.current) {
      imageRef.current.classList.add("opacity-0", "translate-x-20")
      imageRef.current.classList.add("transition-all", "duration-700", "ease-out")
      observer.observe(imageRef.current)
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
      if (textRef.current) observer.unobserve(textRef.current)
      if (imageRef.current) observer.unobserve(imageRef.current)
    }
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="w-full py-24 md:py-32 bg-beige relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4 line-decoration inline-block">
            Sobre Nosotros
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mt-8">
            Conoce nuestra historia y filosofía detrás de cada pieza que creamos
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card ref={cardRef} className="bg-white rounded-xl shadow-soft border-none overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div ref={textRef} className="p-8 md:p-12">
                <h3 className="text-2xl font-medium text-primary mb-6">Nuestra Filosofía</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  En Mueblito / Art & Design creemos que cada pieza de mobiliario es una expresión artística que
                  transforma los espacios y conecta con quienes los habitan.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nuestro proceso creativo combina técnicas artesanales con diseño contemporáneo, utilizando materiales
                  nobles y sostenibles para crear piezas únicas que perduran en el tiempo.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada mueble que creamos cuenta una historia, transmite una emoción y aporta carácter al espacio donde
                  habita. Nos apasiona el diseño, el arte y la funcionalidad en perfecto equilibrio.
                </p>
              </div>
              <div ref={imageRef} className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Taller de Mueblito"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-medium">Nuestro taller</p>
                  <p className="text-sm text-white/80">Donde nacen nuestras creaciones</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
