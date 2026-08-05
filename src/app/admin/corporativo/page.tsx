'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCorporateClients, deleteCorporateClient } from '@/lib/actions/corporate';

type CorporateClient = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  city: string | null;
  industry: string | null;
  employee_count: number | null;
  is_active: boolean;
};

export default function CorporativoPage() {
  const [clients, setClients] = useState<CorporateClient[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getCorporateClients(search || undefined);
      setClients(data as CorporateClient[]);
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
    if (!confirm('Estas seguro de eliminar este cliente corporativo?')) return;
    const result = await deleteCorporateClient(id);
    if (result.success) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Clientes corporativos</h1>
        <Link href="/admin/corporativo/nuevo" className="adm-btn adm-btn-primary">
          Nuevo cliente
        </Link>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <form onSubmit={handleSearch} className="adm-search-form">
            <input
              type="text"
              placeholder="Buscar por empresa..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="adm-input"
            />
            <button type="submit" className="adm-btn adm-btn-secondary">Buscar</button>
          </form>
        </div>

        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : clients.length === 0 ? (
          <p className="adm-empty">No se encontraron clientes corporativos.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Contacto</th>
                  <th>Email</th>
                  <th>Industria</th>
                  <th>Empleados</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.company_name}</td>
                    <td>{client.contact_name}</td>
                    <td>{client.contact_email}</td>
                    <td>{client.industry || '-'}</td>
                    <td>{client.employee_count || '-'}</td>
                    <td>
                      <span className={`adm-badge ${client.is_active ? 'adm-badge-active' : 'adm-badge-paused'}`}>
                        {client.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="adm-action-btns">
                        <Link href={`/admin/corporativo/${client.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          Editar
                        </Link>
                        <button onClick={() => handleDelete(client.id)} className="adm-btn adm-btn-danger adm-btn-sm">
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
