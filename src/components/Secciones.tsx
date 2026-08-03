"use client";

import { CATEGORIAS, type Categoria } from "@/data/productos";
import { Flecha, Logo } from "./Icons";

export function Categorias({ onElegir }: { onElegir: (c: Categoria) => void }) {
  return (
    <div className="wrap" id="categorias">
      <div className="fila-cab">
        <h2>Ideas de regalos</h2>
      </div>
      <div className="cats">
        {CATEGORIAS.map((c) => (
          <button key={c.cat} className="cat-b" onClick={() => onElegir(c.cat)}>
            <div className="ic">{c.icono}</div>
            <div className="n">{c.nombre}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BandaCorporativa({ onSolicitar }: { onSolicitar: () => void }) {
  return (
    <section className="banda-corpo" id="corpo">
      <div className="wrap in">
        <div>
          <h2>Premia, reconoce y fideliza</h2>
          <p>
            Regalos de fin de año, reconocimientos, rifas y programas de incentivos. Tú fijas el
            presupuesto; tu gente elige la experiencia.
          </p>
          <button className="btn" onClick={onSolicitar}>
            Solicitar una propuesta
            <Flecha />
          </button>
        </div>
        <div className="corpo-nums">
          <div>
            <div className="n">+180</div>
            <div className="l">experiencias</div>
          </div>
          <div>
            <div className="n">4.7/5</div>
            <div className="l">satisfacción</div>
          </div>
          <div>
            <div className="n">12 meses</div>
            <div className="l">de vigencia</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Newsletter({ onSuscribir }: { onSuscribir: () => void }) {
  return (
    <section className="news">
      <div className="wrap in">
        <h3>¡Suscríbete a nuestras novedades!</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSuscribir();
          }}
        >
          <input type="email" placeholder="Ingresa tu e-mail" aria-label="Correo electrónico" required />
          <button type="submit">Suscribirme</button>
        </form>
        <small>Recibirás e-mails promocionales aceptando nuestras políticas de privacidad.</small>
      </div>
    </section>
  );
}

export function PieSitio() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="intro">
              Regalar Yupii® es <a href="#">regalar momentos inolvidables</a>: experiencias únicas de
              gastronomía, spa, estadías, aventura y más.
            </p>
          </div>
          <div>
            <h4>Ayuda</h4>
            <ul>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Cómo canjear</a></li>
            </ul>
          </div>
          <div>
            <h4>Yupii</h4>
            <ul>
              <li><a href="#">¿Qué es Yupii?</a></li>
              <li><a href="#corpo">Soluciones corporativas</a></li>
              <li><a href="#">Trabaja con nosotros</a></li>
              <li><a href="#">Conviértete en aliado</a></li>
            </ul>
          </div>
          <div>
            <h4>Regalos</h4>
            <ul>
              <li><a href="#">Experiencias gastronómicas</a></li>
              <li><a href="#">Desayunos y brunch</a></li>
              <li><a href="#">Estar bien</a></li>
              <li><a href="#">Aventura</a></li>
            </ul>
          </div>
          <div>
            <h4>Destinos</h4>
            <ul>
              <li><a href="#">Punta Cana</a></li>
              <li><a href="#">Santo Domingo</a></li>
              <li><a href="#">Samaná</a></li>
              <li><a href="#">Jarabacoa</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bajo">
          <span className="pais">
            🇩🇴
            República Dominicana
          </span>
          <a href="#">Políticas y garantías</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">ProConsumidor</a>
          <span className="pill-borde">Devolver compra</span>
          <span className="pill-borde">Aliados</span>
        </div>

        <p className="legal-nota">
          © 2026 Yupii®. Todos los derechos reservados. Experiencias únicas para regalar en República Dominicana.
          <br />
          Las experiencias, precios y disponibilidad están sujetos a cambios. Válido según términos y condiciones.
        </p>
      </div>
    </footer>
  );
}
