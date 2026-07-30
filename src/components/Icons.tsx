type P = { size?: number; className?: string };

export const Chevron = ({ size = 16, dir = "der" }: P & { dir?: "izq" | "der" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <path d={dir === "izq" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
  </svg>
);

export const Lupa = ({ size = 19 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const Regalo = ({ size = 17 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="8" width="18" height="13" rx="1.5" />
    <path d="M3 12h18M12 8v13M12 8S9.5 3 7.5 4.5 9 8 12 8s4.5-2 2.5-3.5S12 8 12 8" />
  </svg>
);

export const Check = ({ size = 15 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.2l2.4 2.4 4.6-4.9" />
  </svg>
);

export const Usuario = ({ size = 21 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20c1-3.8 4-5.6 7.5-5.6s6.5 1.8 7.5 5.6" />
  </svg>
);

export const Carrito = ({ size = 21 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M3 4h2l2.2 10.5h10L20 7H6.5" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="16.5" cy="19" r="1.4" />
  </svg>
);

export const Corazon = ({ size = 21 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6C19 15.4 12 20 12 20z" />
  </svg>
);

export const Estrella = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);

export const Pin = ({ size = 13 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const Personas = ({ size = 13 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20c.9-3.5 3.7-5.2 7-5.2s6.1 1.7 7 5.2" />
  </svg>
);

export const Reloj = ({ size = 12 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Flecha = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Chat = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-5A8 8 0 1 1 21 11.5z" />
  </svg>
);

export const Logo = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
    <path
      d="M3 17c4.5 7 9.5 10 13 10s8.5-3 13-10c-4.5-2.4-8.7-3.6-13-3.6S7.5 14.6 3 17Z"
      fill="currentColor"
    />
  </svg>
);
