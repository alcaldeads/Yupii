"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "register";

export default function LoginClient() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const switchMode = (m: Mode) => {
    clearMessages();
    setMode(m);
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleLogin = async () => {
    clearMessages();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleAppleLogin = async () => {
    clearMessages();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
    }

    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else {
        window.location.href = "/";
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Revisa tu email para confirmar tu cuenta.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* ─── LEFT PANEL ─── */}
        <div className="auth-left">
          <div className="auth-left-inner">
            <div className="auth-left-logo">Yupii.</div>

            <div className="auth-tagline">
              <span>REGALA.</span>
              <span>EXPLORA.</span>
              <span>SORPRENDE.</span>
            </div>

            <p className="auth-left-sub">
              Las mejores experiencias de la República Dominicana, listas para regalar.
            </p>

            <div className="auth-deco">
              <div className="auth-deco-card auth-deco-1">
                <span className="auth-deco-icon">🍽️</span>
                <span className="auth-deco-label">Gastronomía</span>
              </div>
              <div className="auth-deco-card auth-deco-2">
                <span className="auth-deco-icon">🏄</span>
                <span className="auth-deco-label">Aventura</span>
              </div>
              <div className="auth-deco-card auth-deco-3">
                <span className="auth-deco-icon">💆</span>
                <span className="auth-deco-label">Bienestar</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="auth-right">
          <div className="auth-right-inner">
            <div className="auth-logo-sm">
              Yupii<span className="auth-logo-dot">.</span>
            </div>

            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab${mode === "login" ? " active" : ""}`}
                onClick={() => switchMode("login")}
                type="button"
              >
                Iniciar sesión
              </button>
              <button
                className={`auth-tab${mode === "register" ? " active" : ""}`}
                onClick={() => switchMode("register")}
                type="button"
              >
                Crear cuenta
              </button>
            </div>

            <h1 className="auth-title">
              {mode === "login" ? "¡Bienvenido de vuelta!" : "Únete a Yupii"}
            </h1>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Accede a tus experiencias favoritas"
                : "Crea tu cuenta gratis en segundos"}
            </p>

            {/* Social buttons */}
            <div className="auth-social">
              <button
                className="auth-social-btn auth-google"
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
              >
                <svg className="auth-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar con Google
              </button>

              <button
                className="auth-social-btn auth-apple"
                onClick={handleAppleLogin}
                type="button"
                disabled={loading}
              >
                <svg className="auth-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.33.07 2.26.74 3.04.8.92-.19 1.8-.88 3.04-.94 1.83-.07 3.21.89 4.07 2.26-3.6 2.11-2.99 6.57.74 7.82-.7 1.31-1.64 2.63-2.89 2.94zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continuar con Apple
              </button>
            </div>

            <div className="auth-divider">
              <span>— o continúa con tu email —</span>
            </div>

            {/* Alerts */}
            {error && <div className="auth-alert auth-alert-err">{error}</div>}
            {success && <div className="auth-alert auth-alert-ok">{success}</div>}

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Nombre completo</label>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email</label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Contraseña</label>
                <div className="auth-pass-wrap">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "login" ? "Tu contraseña" : "Mínimo 6 caracteres"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="auth-field">
                  <label htmlFor="auth-confirm">Confirmar contraseña</label>
                  <div className="auth-pass-wrap">
                    <input
                      id="auth-confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repite tu contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showConfirm ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="auth-row">
                  <label className="auth-remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Recordarme
                  </label>
                  <a href="/forgot-password" className="auth-forgot">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              {mode === "register" && (
                <p className="auth-terms">
                  Al registrarte aceptas nuestros{" "}
                  <a href="/terminos">Términos de servicio</a> y{" "}
                  <a href="/privacidad">Política de privacidad</a>.
                </p>
              )}

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner" />
                ) : mode === "login" ? (
                  "Iniciar sesión"
                ) : (
                  "Crear mi cuenta"
                )}
              </button>
            </form>

            <p className="auth-switch">
              {mode === "login" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    className="auth-switch-btn"
                    type="button"
                    onClick={() => switchMode("register")}
                  >
                    Regístrate gratis
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    className="auth-switch-btn"
                    type="button"
                    onClick={() => switchMode("login")}
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
