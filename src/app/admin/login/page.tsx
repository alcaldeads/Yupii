'use client';

import { useState } from 'react';
import { login } from '@/lib/actions/auth';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        <div className="adm-login-logo">Yupii<span>.</span></div>
        <h1 className="adm-login-title">Panel de Administracion</h1>
        <p className="adm-login-subtitle">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} className="adm-login-form">
          {error && <div className="adm-alert adm-alert-error">{error}</div>}

          <div className="adm-field">
            <label htmlFor="email">Correo electronico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@yupii.do"
              required
              autoComplete="email"
            />
          </div>

          <div className="adm-field">
            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Tu contrasena"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="adm-btn adm-btn-primary adm-btn-full" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
