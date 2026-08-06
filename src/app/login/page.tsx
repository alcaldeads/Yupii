import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Iniciar sesión — Yupii",
  description: "Accede a las mejores experiencias de la República Dominicana",
};

export default function LoginPage() {
  return <LoginClient />;
}
