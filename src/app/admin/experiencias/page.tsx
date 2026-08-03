'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getExperiences, deleteExperience } from '@/lib/actions/experiences';

type Experience = {
  id: string;
  title: string;
  price_current: number;
  status: string;
  icon: string | null;
  categories: { name: string } | null;
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Borrador',
  active: 'Activa',
  paused: 'Pausada',
  archived: 'Archivada',
};

function formatCurrency(amount: number) {
  return `RD$${Number(amount).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
}

export default function ExperienciasPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getExperiences(search || undefined, statusFilter);
      setExperiences(data as unknown as Experience[]);
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

  async function handleDelete(id: string) {
    if (!confirm('Estas seguro de eliminar esta experiencia?')) return;
    const result = await deleteExperience(id);
    if (result.success) {
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Experiencias</h1>
        <Link href="/admin/experiencias/nueva" className="adm-btn adm-btn-primary">
          Nueva experiencia
        </Link>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <form onSubmit={handleSearch} className="adm-search-form">
            <input
              type="text"
              placeholder="Buscar por titulo..."
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
            <option value="active">Activa</option>
            <option value="draft">Borrador</option>
            <option value="paused">Pausada</option>
            <option value="archived">Archivada</option>
          </select>
        </div>

        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : experiences.length === 0 ? (
          <p className="adm-empty">No se encontraron experiencias.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map(exp => (
                  <tr key={exp.id}>
                    <td>
                      <span className="adm-cell-with-icon">
                        {exp.icon && <span>{exp.icon}</span>}
                        <span>{exp.title}</span>
                      </span>
                    </td>
                    <td>{exp.categories?.name || '-'}</td>
                    <td>{formatCurrency(exp.price_current)}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${exp.status}`}>
                        {STATUS_LABELS[exp.status] || exp.status}
                      </span>
                    </td>
                    <td>
                      <div className="adm-action-btns">
                        <Link href={`/admin/experiencias/${exp.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="adm-btn adm-btn-danger adm-btn-sm"
                        >
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
