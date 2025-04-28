import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  location: string
  comment: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Laura Mendoza",
    location: "Córdoba",
    comment:
      "La mesa de la línea Orgánica que compré es una verdadera obra de arte. La calidad y el diseño son excepcionales, y el servicio fue impecable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Martín Gutiérrez",
    location: "Buenos Aires",
    comment:
      "Adquirí varias piezas de la línea Brutalista para mi estudio y han transformado completamente el espacio. El proceso de compra fue muy sencillo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carolina Sánchez",
    location: "Mendoza",
    comment:
      "Los muebles infantiles de la línea Piccolo son hermosos y muy seguros. Mi hija está encantada con su nueva cama. ¡Gracias Mueblito!",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-16 md:py-24 bg-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-medium text-primary text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-white rounded-xl shadow-soft border-none slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

                <div>
                  <p className="font-medium text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
