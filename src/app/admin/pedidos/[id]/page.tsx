import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/actions/orders';
import Link from 'next/link';
import OrderStatusForm from './OrderStatusForm';

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
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function PedidoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let order;
  try {
    order = await getOrder(id);
  } catch {
    notFound();
  }

  if (!order) notFound();

  return (
    <div>
      <div className="adm-page-header">
        <h1>Pedido {order.order_number}</h1>
        <Link href="/admin/pedidos" className="adm-btn adm-btn-secondary">Volver a pedidos</Link>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card">
          <div className="adm-card-header">
            <h2>Informacion del pedido</h2>
            <span className={`adm-badge adm-badge-${order.status}`}>
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <div className="adm-detail-list">
            <div className="adm-detail-row">
              <span className="adm-detail-label">Numero:</span>
              <span>{order.order_number}</span>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Tipo:</span>
              <span>{order.type === 'corporate' ? 'Corporativo' : 'Individual'}</span>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Fecha:</span>
              <span>{formatDate(order.created_at)}</span>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Subtotal:</span>
              <span>{formatCurrency(Number(order.subtotal))}</span>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Descuento:</span>
                <span>-{formatCurrency(Number(order.discount_amount))}</span>
              </div>
            )}
            {Number(order.tax_amount) > 0 && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">ITBIS:</span>
                <span>{formatCurrency(Number(order.tax_amount))}</span>
              </div>
            )}
            <div className="adm-detail-row adm-detail-total">
              <span className="adm-detail-label">Total:</span>
              <span>{formatCurrency(Number(order.total))}</span>
            </div>
          </div>
        </div>

        <div className="adm-card">
          <h2 className="adm-card-title">Comprador</h2>
          <div className="adm-detail-list">
            <div className="adm-detail-row">
              <span className="adm-detail-label">Nombre:</span>
              <span>{order.buyer_name}</span>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Email:</span>
              <span>{order.buyer_email}</span>
            </div>
            {order.buyer_phone && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Telefono:</span>
                <span>{order.buyer_phone}</span>
              </div>
            )}
          </div>

          {order.recipient_name && (
            <>
              <h3 className="adm-card-subtitle">Destinatario</h3>
              <div className="adm-detail-list">
                <div className="adm-detail-row">
                  <span className="adm-detail-label">Nombre:</span>
                  <span>{order.recipient_name}</span>
                </div>
                {order.recipient_email && (
                  <div className="adm-detail-row">
                    <span className="adm-detail-label">Email:</span>
                    <span>{order.recipient_email}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {order.gift_message && (
            <div className="adm-detail-message">
              <strong>Mensaje:</strong>
              <p>{order.gift_message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="adm-card">
        <h2 className="adm-card-title">Items del pedido</h2>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Experiencia</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(order.order_items || []).map((item: { id: string; quantity: number; unit_price: number; total_price: number; experiences: { title: string; icon: string | null } | null }) => (
                <tr key={item.id}>
                  <td>
                    <span className="adm-cell-with-icon">
                      {item.experiences?.icon && <span>{item.experiences.icon}</span>}
                      <span>{item.experiences?.title || 'Experiencia eliminada'}</span>
                    </span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(Number(item.unit_price))}</td>
                  <td>{formatCurrency(Number(item.total_price))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {order.gift_codes && order.gift_codes.length > 0 && (
        <div className="adm-card">
          <h2 className="adm-card-title">Codigos de regalo</h2>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Estado</th>
                  <th>Expira</th>
                  <th>Canjeado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {order.gift_codes.map((code: { id: string; code: string; status: string; expires_at: string; redeemed_at: string | null }) => (
                  <tr key={code.id}>
                    <td><code className="adm-code">{code.code}</code></td>
                    <td>
                      <span className={`adm-badge adm-badge-${code.status}`}>
                        {code.status}
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
        </div>
      )}

      <div className="adm-card">
        <h2 className="adm-card-title">Cambiar estado</h2>
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
