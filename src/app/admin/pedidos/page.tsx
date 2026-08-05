'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders } from '@/lib/actions/orders';

type Order = {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  total: number;
  status: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

function formatCurrency(amount: number) {
  return `RD$${Number(amount).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getOrders(search || undefined, statusFilter);
      setOrders(data as Order[]);
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
        <h1>Pedidos</h1>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <form onSubmit={handleSearch} className="adm-search-form">
            <input
              type="text"
              placeholder="Buscar por numero, nombre o email..."
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
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>

        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : orders.length === 0 ? (
          <p className="adm-empty">No se encontraron pedidos.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Comprador</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <Link href={`/admin/pedidos/${order.id}`} className="adm-link">
                        {order.order_number}
                      </Link>
                    </td>
                    <td>
                      <div>{order.buyer_name}</div>
                      <div className="adm-cell-sub">{order.buyer_email}</div>
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${order.status}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <Link href={`/admin/pedidos/${order.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
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
