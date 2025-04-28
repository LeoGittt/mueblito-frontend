"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Mueble de diseño",
    category: "Línea Orgánica",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Mobiliario infantil",
    category: "Línea Piccolo",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Mesa de centro",
    category: "Línea Brutalista",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Lámpara artística",
    category: "Línea Alamin",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Silla de diseño",
    category: "Línea Fazzio",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Cuadro decorativo",
    category: "Línea Tiersen",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  // Efecto de aparición al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "scale-100")
            entry.target.classList.remove("opacity-0", "scale-95")
          }
        })
      },
      { threshold: 0.1 },
    )

    imagesRef.current.forEach((img) => {
      if (img) {
        img.classList.add("opacity-0", "scale-95")
        img.classList.add("transition-all", "duration-700", "ease-out")
        observer.observe(img)
      }
    })

    return () => {
      imagesRef.current.forEach((img) => {
        if (img) observer.unobserve(img)
      })
    }
  }, [])

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return

    const newIndex = selectedImage + direction
    if (newIndex >= 0 && newIndex < galleryImages.length) {
      setSelectedImage(newIndex)
    }
  }

  // Manejar teclas para navegar por el lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateImage(-1)
      if (e.key === "ArrowRight") navigateImage(1)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <section id="galeria" className="w-full py-16 md:py-24 bg-beige relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige to-transparent"></div>

      <div ref={galleryRef} className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4 line-decoration inline-block">Galería</h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mt-8">
            Explora nuestra colección de piezas únicas que combinan funcionalidad, arte y diseño
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              style={{ transitionDelay: `${index * 100}ms` }}
              className="aspect-square relative overflow-hidden rounded-xl cursor-pointer group hoverable"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white text-lg font-medium">{image.alt}</p>
                <p className="text-white/80 text-sm">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={() => navigateImage(-1)}
            disabled={selectedImage === 0}
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <Image
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain scale-in"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
              <p className="text-lg font-medium">{galleryImages[selectedImage].alt}</p>
              <p className="text-sm text-white/80">{galleryImages[selectedImage].category}</p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={() => navigateImage(1)}
            disabled={selectedImage === galleryImages.length - 1}
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      )}
    </section>
  )
}
