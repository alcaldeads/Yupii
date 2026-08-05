/** Formatea un monto en pesos dominicanos. */
export function rd(n: number): string {
  return "RD$" + Math.round(n).toLocaleString("en-US");
}

/** Degradado de la "foto" de una experiencia. */
export function degradado([a, b]: [string, string]): string {
  return `linear-gradient(140deg,${a} 0%,${b} 100%)`;
}

/** Genera un código de regalo tipo YUP-AB12-CD. */
export function generarCodigo(): string {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => A[Math.floor(Math.random() * A.length)]).join("");
  return `YUP-${pick(4)}-${pick(2)}`;
}
