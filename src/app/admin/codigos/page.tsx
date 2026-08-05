'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGiftCodes } from '@/lib/actions/gift-codes';

type GiftCode = {
  id: string;
  code: string;
  status: string;
  expires_at: string;
  redeemed_at: string | null;
  experiences: { title: string } | null;
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  reserved: 'Reservado',
  redeemed: 'Canjeado',
  expired: 'Expirado',
  cancelled: 'Cancelado',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function CodigosPage() {
  const [codes, setCodes] = useState<GiftCode[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getGiftCodes(search || undefined, statusFilter);
      setCodes(data as unknown as GiftCode[]);
    } catch {
      // Error loading
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await loadData();
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Codigos de regalo</h1>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <form onSubmit={handleSearch} className="adm-search-form">
            <input
              type="text"
              placeholder="Buscar por codigo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="adm-input"
            />
            <button type="submit" className="adm-btn adm-btn-secondary">Buscar</button>
          </form>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="adm-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="reserved">Reservado</option>
            <option value="redeemed">Canjeado</option>
            <option value="expired">Expirado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : codes.length === 0 ? (
          <p className="adm-empty">No se encontraron codigos.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Experiencia</th>
                  <th>Estado</th>
                  <th>Expira</th>
                  <th>Canjeado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {codes.map(code => (
                  <tr key={code.id}>
                    <td><code className="adm-code">{code.code}</code></td>
                    <td>{code.experiences?.title || '-'}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${code.status}`}>
                        {STATUS_LABELS[code.status] || code.status}
                      </span>
                    </td>
                    <td>{formatDate(code.expires_at)}</td>
                    <td>{code.redeemed_at ? formatDate(code.redeemed_at) : '-'}</td>
                    <td>
                      <Link href={`/admin/codigos/${code.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
