import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductLines from "@/components/product-lines"
import Orders from "@/components/orders"
import ContactSection from "@/components/contact-section"
import Gallery from "@/components/gallery"
import AboutUs from "@/components/about-us"
import Footer from "@/components/footer"
import CatalogDownload from "@/components/catalog-download"
import Cursor from "@/components/cursor"
import Decorations from "@/components/decorations"

export default function Home() {
  return (
    <main className="min-h-screen bg-beige relative">
      <Cursor />
      <Decorations />
      <Navbar />
      <Hero />
      <ProductLines />
      <Gallery />
      <CatalogDownload />
      <Orders />
      <ContactSection />
      <AboutUs />
      <Footer />
    </main>
  )
}
