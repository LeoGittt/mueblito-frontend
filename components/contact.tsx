"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Mostrar mensaje de éxito (en una implementación real)
  }

  return (
    <section id="contacto" className="w-full py-16 md:py-24 bg-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-medium text-primary text-center mb-12">Contacto</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Información de contacto */}
          <div className="space-y-8 fade-in">
            <Card className="bg-white rounded-xl shadow-soft border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-primary mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <ContactInfo
                    icon={<Mail className="h-5 w-5 text-primary" />}
                    title="Email"
                    detail="mueblitocodamuebles@gmail.com"
                    href="mailto:mueblitocodamuebles@gmail.com"
                  />

                  <ContactInfo
                    icon={<Phone className="h-5 w-5 text-primary" />}
                    title="Teléfonos"
                    detail="2644568079 / 3516964088"
                    href="tel:+542644568079"
                  />
                </div>

                <div className="mt-8">
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                    onClick={() => window.open("https://wa.me/542644568079", "_blank")}
                  >
                    Contactar por WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de contacto */}
          <div className="slide-in">
            <Card className="bg-white rounded-xl shadow-soft border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-primary mb-6">Envíanos un Mensaje</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                      className="w-full min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  detail: string
  href: string
}

function ContactInfo({ icon, title, detail, href }: ContactInfoProps) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <a href={href} className="text-primary hover:underline transition-colors">
          {detail}
        </a>
      </div>
    </div>
  )
}
