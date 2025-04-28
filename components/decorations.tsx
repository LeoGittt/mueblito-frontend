"use client";

import { useEffect, useState } from "react";
import "../styles/decorations.css";

export default function Decorations() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Círculos decorativos - ajustados para evitar overflow */}
      <div className="circle-decoration1" />
      <div className="circle-decoration2" />
      <div className="circle-decoration3" />
      <div className="circle-decoration4" />

      {/* Líneas decorativas */}
      <div className="line-decoration1" />
      <div className="line-decoration2" />
      <div className="line-decoration3" />
    </>
  );
}
