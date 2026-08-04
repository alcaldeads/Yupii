"use client";

import { useState, useMemo } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas, Chevron } from "@/components/Icons";

type CatInfo = {
  cat: string;
  icono: string;
  nombre: string;
  slug: string;
  descripcion: string;
};

type Sort = "recomendados" | "precio-asc" | "precio-desc" | "rating";

type Props = {
  cat: CatInfo;
  productos: Producto[];
  zonas: string[];
  tipos: string[];
};

export default function ExplorarClient({ cat, productos, zonas, tipos }: Props) {
  const [zona, setZona] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("recomendados");

  const filtered = useMemo(() => {
    let result = [...productos];
    if (zona) result = result.filter((p) => p.zona === zona);
    if (tipo) result = result.filter((p) => p.tipo === tipo);

    switch (sort) {
      case "precio-asc":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [productos, zona, tipo, sort]);

  const clearFilters = () => {
    setZona(null);
    setTipo(null);
    setSort("recomendados");
  };

  const hasFilters = zona || tipo || sort !== "recomendados";

  return (
    <>
      {/* Header */}
      <header className="exp-header" style={{ borderBottom: "1px solid var(--gris-borde)" }}>
        <div className="wrap">
          <a href="/" className="exp-back">
            <Chevron dir="izq" size={16} /> Volver al inicio
          </a>
        </div>
      </header>

      <main className="explorar-page">
        <div className="wrap">
          {/* Hero */}
          <section className="explorar-hero">
            <span className="explorar-icono">{cat.icono}</span>
            <h1>{cat.nombre}</h1>
            <p className="explorar-desc">{cat.descripcion}</p>
            <span className="explorar-count">
              {productos.length} experiencia{productos.length !== 1 ? "s" : ""} disponibles
            </span>
          </section>

          {/* Filters */}
          <section className="explorar-filtros">
            {/* Zones */}
            {zonas.length > 0 && (
              <div className="filtro-grupo">
                <span className="filtro-label">Ubicación</span>
                <div className="filtro-pills">
                  <button
                    className={`filtro-pill${!zona ? " activo" : ""}`}
                    onClick={() => setZona(null)}
                  >
                    Todas
                  </button>
                  {zonas.map((z) => (
                    <button
                      key={z}
                      className={`filtro-pill${zona === z ? " activo" : ""}`}
                      onClick={() => setZona(zona === z ? null : z)}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Types */}
            {tipos.length > 0 && (
              <div className="filtro-grupo">
                <span className="filtro-label">Tipo</span>
                <div className="filtro-pills">
                  <button
                    className={`filtro-pill${!tipo ? " activo" : ""}`}
                    onClick={() => setTipo(null)}
                  >
                    Todos
                  </button>
                  {tipos.map((t) => (
                    <button
                      key={t}
                      className={`filtro-pill${tipo === t ? " activo" : ""}`}
                      onClick={() => setTipo(tipo === t ? null : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort + clear */}
            <div className="filtro-grupo filtro-sort-row">
              <div className="filtro-sort">
                <span className="filtro-label">Ordenar</span>
                <select
                  className="filtro-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                >
                  <option value="recomendados">Más recomendados</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor calificados</option>
                </select>
              </div>
              {hasFilters && (
                <button className="filtro-limpiar" onClick={clearFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>
          </section>

          {/* Results count */}
          <div className="explorar-resultados-info">
            <span>
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {zona ? ` en ${zona}` : ""}
              {tipo ? ` · ${tipo}` : ""}
            </span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="explorar-vacio">
              <p>No encontramos experiencias con esos filtros.</p>
              <button className="btn-borde" onClick={clearFilters}>
                Ver todas las experiencias
              </button>
            </div>
          ) : (
            <div className="explorar-grid">
              {filtered.map((p) => (
                <a
                  key={p.id}
                  href={`/experiencia/${p.slug}`}
                  className="explorar-card"
                >
                  <div className="explorar-card-img">
                    <div
                      className="explorar-card-fondo"
                      style={{
                        backgroundImage: `url(${p.imagen})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="explorar-card-img-overlay" />

                    {p.etiqueta && (
                      <span
                        className={`etiqueta${
                          p.etiqueta === "Exclusivo" ? " exclusivo" : ""
                        }${
                          p.etiqueta.startsWith("Temporada") ? " temporada" : ""
                        }`}
                      >
                        {p.etiqueta}
                      </span>
                    )}

                    <div className="explorar-card-rating">
                      <Estrella size={12} />
                      {p.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="explorar-card-body">
                    <h3>{p.titulo}</h3>
                    <p className="explorar-card-desc">{p.descripcion}</p>

                    <div className="explorar-card-meta">
                      <span>
                        <Pin size={12} /> {p.lugar}
                      </span>
                      <span>
                        <Personas size={12} /> {p.personas} pers.
                      </span>
                    </div>

                    {p.tipo && <span className="explorar-card-tipo">{p.tipo}</span>}

                    <div className="explorar-card-precio">
                      <strong>{rd(p.precio)}</strong>
                      {p.precioAntes > 0 && (
                        <span className="explorar-card-antes">{rd(p.precioAntes)}</span>
                      )}
                      <span className="explorar-card-por">para {p.personas}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="explorar-footer">
        <div className="wrap">
          <a href="/" className="explorar-footer-back">← Volver al inicio</a>
          <span>© 2026 Yupii®</span>
        </div>
      </footer>
    </>
  );
}
