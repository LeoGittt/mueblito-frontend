"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoveRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const scrollToProducts = () => {
    document.getElementById("lineas")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center bg-beige overflow-hidden isolate pt-16 md:pt-0"
    >
      {/* Fondo estilo Vercel con degradados animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-0 left-1/2 w-[200%] h-full -translate-x-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,#fafafa_0%,#e4e4e7_50%,#fafafa_100%)] opacity-10" />

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      {/* Grid sutil al estilo Vercel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-5 -z-10" />

      {/* Contenido principal */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 z-10 py-12 md:py-0"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Badge de marca al estilo Vercel */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "mb-4 px-3 py-1 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm",
              "text-xs sm:text-sm font-medium text-primary/80 tracking-wider",
              "shadow-sm hover:shadow-md transition-shadow duration-300"
            )}
          >
            <span className="text-primary">MUEBLITO</span>
            <span className="mx-1.5 text-muted-foreground/40">/</span>
            <span className="text-secondary">ART & DESIGN</span>
          </motion.div>

          {/* Título principal con efecto Vercel */}
          <motion.h1
            variants={itemVariants}
            className={cn(
              "text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-medium text-foreground mb-5 md:mb-6",
              "bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/70",
              "leading-tight md:leading-tighter"
            )}
          >
            <span className="block">Mobiliario que</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10">inspira emociones</span>
              <motion.span
                className="absolute bottom-1 left-0 w-full h-3 md:h-4 bg-primary/20 -z-10 rounded-full"
                variants={floatVariants}
                animate="float"
              />
            </span>
          </motion.h1>

          {/* Subtítulo con animación de palabras */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-md md:max-w-2xl mx-auto leading-relaxed"
          >
            Donde el{" "}
            <span className="font-medium text-primary">diseño innovador</span>{" "}
            se encuentra con la{" "}
            <span className="font-medium text-secondary">
              artesanía tradicional
            </span>
          </motion.p>

          {/* Botones con efecto Vercel */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button
              className={cn(
                "group relative overflow-hidden",
                "bg-gradient-to-b from-primary to-primary-dark hover:to-primary",
                "text-white px-6 sm:px-7 py-5 sm:py-6 h-auto text-sm sm:text-base md:text-lg",
                "rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300",
                "border border-primary/30 hover:border-primary/50"
              )}
              onClick={scrollToProducts}
            >
              <span className="relative z-10 flex items-center">
                Explorar Colección
                <MoveRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              variant="outline"
              className={cn(
                "group relative overflow-hidden",
                "border-2 border-primary/20 hover:border-primary/40",
                "bg-white/80 hover:bg-white/90 px-6 sm:px-7 py-5 sm:py-6 h-auto",
                "text-sm sm:text-base md:text-lg text-primary rounded-full",
                "shadow-sm hover:shadow-md transition-all duration-300",
                "backdrop-blur-sm"
              )}
              onClick={() =>
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10">Diseño a Medida</span>
              <span className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Indicadores de calidad estilo Vercel */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 md:mt-12"
          >
            {[
              "Diseño Exclusivo",
              "Materiales Premium",
              "Artesanía Detallista",
            ].map((item) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                  "bg-white/50 backdrop-blur-sm border border-primary/10",
                  "text-xs sm:text-sm font-medium text-muted-foreground",
                  "shadow-xs hover:shadow-sm transition-shadow duration-200"
                )}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Flecha de scroll animada al estilo Vercel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={scrollToProducts}
          className="cursor-pointer flex flex-col items-center group"
        >
          <div
            className={cn(
              "p-2 rounded-full bg-white/80 group-hover:bg-white",
              "border border-primary/10 shadow-xs hover:shadow-sm",
              "transition-all duration-300"
            )}
          >
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-dark transition-colors duration-300" />
          </div>
          <span className="text-xs text-primary/60 mt-2 tracking-wider font-medium">
            EXPLORAR
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
