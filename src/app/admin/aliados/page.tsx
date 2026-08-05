'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPartners, deletePartner } from '@/lib/actions/partners';

type Partner = {
  id: string;
  name: string;
  type: string;
  city: string | null;
  commission_percent: number;
  is_active: boolean;
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: 'Restaurante',
  spa: 'Spa',
  hotel: 'Hotel',
  adventure: 'Aventura',
  nautical: 'Nautico',
  cultural: 'Cultural',
};

export default function AliadosPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getPartners(search || undefined);
      setPartners(data as Partner[]);
    } catch {
      // Error loading
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Estas seguro de eliminar este aliado?')) return;
    const result = await deletePartner(id);
    if (result.success) {
      setPartners(prev => prev.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Aliados</h1>
        <Link href="/admin/aliados/nuevo" className="adm-btn adm-btn-primary">
          Nuevo aliado
        </Link>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <form onSubmit={handleSearch} className="adm-search-form">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="adm-input"
            />
            <button type="submit" className="adm-btn adm-btn-secondary">Buscar</button>
          </form>
        </div>

        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : partners.length === 0 ? (
          <p className="adm-empty">No se encontraron aliados.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Ciudad</th>
                  <th>Comision %</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{TYPE_LABELS[p.type] || p.type}</td>
                    <td>{p.city || '-'}</td>
                    <td>{p.commission_percent}%</td>
                    <td>
                      <span className={`adm-badge ${p.is_active ? 'adm-badge-active' : 'adm-badge-paused'}`}>
                        {p.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="adm-action-btns">
                        <Link href={`/admin/aliados/${p.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          Editar
                        </Link>
                        <button onClick={() => handleDelete(p.id)} className="adm-btn adm-btn-danger adm-btn-sm">
                          Eliminar
                        </button>
                      </div>
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
