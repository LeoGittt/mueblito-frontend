"use client"

import { useRef, useEffect } from "react"
import { Package, Truck, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Orders() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-20")
          }
        })
      },
      { threshold: 0.1 },
    )

    const itemsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0")
              entry.target.classList.remove("opacity-0", "translate-y-10")
            }, index * 200)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      cardRef.current.classList.add("opacity-0", "translate-y-20")
      cardRef.current.classList.add("transition-all", "duration-1000", "ease-out")
      cardObserver.observe(cardRef.current)
    }

    itemsRef.current.forEach((item) => {
      if (item) {
        item.classList.add("opacity-0", "translate-y-10")
        item.classList.add("transition-all", "duration-700", "ease-out")
        itemsObserver.observe(item)
      }
    })

    return () => {
      if (cardRef.current) cardObserver.unobserve(cardRef.current)
      itemsRef.current.forEach((item) => {
        if (item) itemsObserver.unobserve(item)
      })
    }
  }, [])

  return (
    <section id="pedidos" ref={sectionRef} className="w-full py-24 md:py-32 bg-beige relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4 line-decoration inline-block">
            Información de Pedidos
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mt-8">
            Conoce nuestro proceso de pedidos y envíos para adquirir tus piezas favoritas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card ref={cardRef} className="bg-white rounded-xl shadow-soft border-none overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div ref={(el) => (itemsRef.current[0] = el)} className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <CreditCard className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3">Seña del 30%</h3>
                  <p className="text-muted-foreground">
                    Los pedidos se toman con una seña del 30% del precio total del producto.
                  </p>
                </div>

                <div ref={(el) => (itemsRef.current[1] = el)} className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <Package className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3">Envío e Instalación</h3>
                  <p className="text-muted-foreground">La compra incluye envío e instalación correspondiente.</p>
                </div>

                <div ref={(el) => (itemsRef.current[2] = el)} className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <Truck className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3">Envíos Nacionales</h3>
                  <p className="text-muted-foreground">Realizamos envíos a todo el país.</p>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[3] = el)} className="mt-12 p-6 bg-gradient-soft rounded-lg">
                <p className="text-muted-foreground text-center">
                  Para consultas específicas sobre plazos de entrega o métodos de pago, no dudes en contactarnos a
                  través de WhatsApp o correo electrónico.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
