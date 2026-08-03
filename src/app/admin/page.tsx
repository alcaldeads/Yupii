import { getDashboardStats, getRecentOrders } from '@/lib/actions/dashboard';
import Link from 'next/link';

function formatCurrency(amount: number) {
  return `RD$${amount.toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

export default async function DashboardPage() {
  let stats = { totalExperiences: 0, activeCodes: 0, totalOrders: 0, revenue: 0 };
  let recentOrders: Awaited<ReturnType<typeof getRecentOrders>> = [];

  try {
    stats = await getDashboardStats();
  } catch {
    // Stats unavailable
  }

  try {
    recentOrders = await getRecentOrders();
  } catch {
    // Orders unavailable
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Dashboard</h1>
        <div className="adm-page-actions">
          <Link href="/admin/experiencias/nueva" className="adm-btn adm-btn-primary">Nueva experiencia</Link>
          <Link href="/admin/aliados/nuevo" className="adm-btn adm-btn-secondary">Nuevo aliado</Link>
        </div>
      </div>

      <div className="adm-stats-grid">
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total experiencias</div>
          <div className="adm-stat-value">{stats.totalExperiences}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Codigos activos</div>
          <div className="adm-stat-value">{stats.activeCodes}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total pedidos</div>
          <div className="adm-stat-value">{stats.totalOrders}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Ingresos</div>
          <div className="adm-stat-value">{formatCurrency(stats.revenue)}</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h2>Pedidos recientes</h2>
          <Link href="/admin/pedidos" className="adm-link">Ver todos</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="adm-empty">No hay pedidos aun.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Comprador</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link href={`/admin/pedidos/${order.id}`} className="adm-link">
                        {order.order_number}
                      </Link>
                    </td>
                    <td>{order.buyer_name}</td>
                    <td>{formatCurrency(Number(order.total))}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${order.status}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
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
