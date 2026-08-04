import { notFound } from "next/navigation";
import { CATEGORIAS, PRODUCTOS } from "@/data/productos";
import type { Metadata } from "next";
import ExplorarClient from "./ExplorarClient";

type Props = { params: Promise<{ categoria: string }> };

export async function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: `${cat.nombre} — Explorar experiencias | Yupii`,
    description: cat.descripcion,
  };
}

export default async function ExplorarPage({ params }: Props) {
  const { categoria } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const productos = PRODUCTOS.filter((p) => p.categoria === cat.cat);
  const zonas = [...new Set(productos.map((p) => p.zona).filter(Boolean))] as string[];
  const tipos = [...new Set(productos.map((p) => p.tipo).filter(Boolean))] as string[];

  return (
    <ExplorarClient
      cat={cat}
      productos={productos}
      zonas={zonas}
      tipos={tipos}
    />
  );
}
