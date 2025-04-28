"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface ProductLine {
  id: string
  number: string
  title: string
  description: string
  image: string
}

const productLines: ProductLine[] = [
  {
    id: "piccolo",
    number: "01",
    title: "Línea Piccolo",
    description: "Mobiliario Infantil diseñado con amor para los más pequeños del hogar.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "organica",
    number: "02",
    title: "Línea Orgánica",
    description: "Formas naturales y fluidas que se integran armoniosamente en cualquier espacio.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "brutalista",
    number: "03",
    title: "Línea Brutalista",
    description: "Diseños audaces con líneas marcadas y materiales en su estado más puro.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "fazzio",
    number: "04",
    title: "Línea Fazzio",
    description: "Elegancia contemporánea con toques artísticos para espacios sofisticados.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "alamin",
    number: "05",
    title: "Línea Alamin",
    description: "Bancos, Escultura, Lámpara & Candelabros con un enfoque artístico único.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "tiersen",
    number: "06",
    title: "Línea Tiersen",
    description: "Art Prints & Cuadros que complementan y elevan cualquier ambiente.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProductLines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) {
        card.classList.add("opacity-0", "translate-y-10")
        card.classList.add("transition-all", "duration-700", "ease-out")
        observer.observe(card)
      }
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section id="lineas" ref={sectionRef} className="w-full py-24 md:py-32 bg-beige relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-beige to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4 line-decoration inline-block">
            Nuestras Líneas
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mt-8">
            Cada línea de Mueblito es una expresión artística única, diseñada con pasión y atención al detalle para
            transformar tus espacios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {productLines.map((line, index) => (
            <div
              key={line.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="bg-white rounded-xl overflow-hidden border-none card-shadow-hover h-full">
                <div className="relative h-64 w-full overflow-hidden group">
                  <Image
                    src={line.image || "/placeholder.svg"}
                    alt={line.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    {line.number}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl text-primary font-medium mb-2">{line.title}</h3>
                  <p className="text-muted-foreground mb-6">{line.description}</p>

                  <Button
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white group"
                  >
                    Ver más
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
