import { notFound } from "next/navigation";
import { PRODUCTOS, CATEGORIAS } from "@/data/productos";
import type { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTOS.find((x) => x.slug === slug);
  if (!p) return { title: "Experiencia no encontrada | Yupii" };

  return {
    title: `${p.titulo} en ${p.lugar} | Yupii`,
    description: p.descripcion,
    openGraph: {
      title: `${p.titulo} | Yupii`,
      description: p.historia,
      images: [{ url: p.imagen, width: 800, height: 600, alt: p.titulo }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.titulo} | Yupii`,
      description: p.historia,
      images: [p.imagen],
    },
  };
}

export default async function ExperienciaPage({ params }: Props) {
  const { slug } = await params;
  const producto = PRODUCTOS.find((p) => p.slug === slug);
  if (!producto) notFound();

  const relacionadas = PRODUCTOS.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id
  ).slice(0, 3);

  const catInfo = CATEGORIAS.find((c) => c.cat === producto.categoria);

  return (
    <ExperienceClient
      producto={producto}
      relacionadas={relacionadas}
      catSlug={catInfo?.slug ?? ""}
      catNombre={catInfo?.nombre ?? "Explorar"}
    />
  );
}
