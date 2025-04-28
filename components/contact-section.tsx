"use client"

import { useRef, useEffect } from "react"
import { Mail, Phone, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
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

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-x-0")
              entry.target.classList.remove(
                "opacity-0",
                entry.target.classList.contains("from-left") ? "-translate-x-20" : "translate-x-20",
              )
            }, index * 200)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      titleRef.current.classList.add("opacity-0", "translate-y-10")
      titleRef.current.classList.add("transition-all", "duration-700", "ease-out")
      titleObserver.observe(titleRef.current)
    }

    cardsRef.current.forEach((card) => {
      if (card) {
        card.classList.add("opacity-0")
        card.classList.add(card.classList.contains("from-left") ? "-translate-x-20" : "translate-x-20")
        card.classList.add("transition-all", "duration-1000", "ease-out")
        cardsObserver.observe(card)
      }
    })

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current)
      cardsRef.current.forEach((card) => {
        if (card) cardsObserver.unobserve(card)
      })
    }
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="w-full py-24 md:py-32 bg-beige relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>

      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4 line-decoration inline-block">Contacto</h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mt-8">
            Estamos a tu disposición para resolver cualquier duda o consulta sobre nuestros productos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* WhatsApp */}
          <div
            ref={(el) => {
              if (el) {
                el.classList.add("from-left")
                cardsRef.current[0] = el
              }
            }}
          >
            <Card className="bg-white rounded-xl shadow-soft border-none overflow-hidden h-full card-shadow-hover">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6 p-4 bg-[#25D366]/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-[#25D366]" />
                </div>

                <h3 className="text-xl font-medium text-[#25D366] mb-3">WhatsApp</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Contáctanos directamente por WhatsApp para una respuesta rápida a tus consultas.
                </p>

                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Teléfonos:</span>
                    <br />
                    2644568079
                    <br />
                    3516964088
                  </p>

                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                    onClick={() => window.open("https://wa.me/542644568079", "_blank")}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email */}
          <div
            ref={(el) => {
              if (el) {
                el.classList.add("from-left")
                cardsRef.current[1] = el
              }
            }}
          >
            <Card className="bg-white rounded-xl shadow-soft border-none overflow-hidden h-full card-shadow-hover">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>

                <h3 className="text-xl font-medium text-primary mb-3">Correo Electrónico</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Envíanos un email con tus consultas, pedidos o solicitudes de presupuesto.
                </p>

                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Email:</span>
                    <br />
                    mueblitocodamuebles@gmail.com
                  </p>

                  <Button
                    className="w-full bg-primary hover:bg-primary-hover text-white"
                    onClick={() => window.open("mailto:mueblitocodamuebles@gmail.com", "_blank")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instagram */}
          <div
            ref={(el) => {
              if (el) {
                cardsRef.current[2] = el
              }
            }}
          >
            <Card className="bg-white rounded-xl shadow-soft border-none overflow-hidden h-full card-shadow-hover">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6 p-4 bg-[#E1306C]/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-[#E1306C]" />
                </div>

                <h3 className="text-xl font-medium text-[#E1306C] mb-3">Instagram</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Síguenos en Instagram para ver nuestras últimas creaciones y novedades.
                </p>

                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Instagram:</span>
                    <br />
                    @mueblito_artdesign
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white"
                    onClick={() => window.open("https://instagram.com/mueblito_artdesign", "_blank")}
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Seguir en Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
