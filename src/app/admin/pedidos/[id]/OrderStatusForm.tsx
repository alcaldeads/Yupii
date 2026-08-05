'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateOrderStatus } from '@/lib/actions/orders';

export default function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await updateOrderStatus(orderId, status);
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Estado actualizado correctamente.');
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="adm-inline-form">
      <select value={status} onChange={e => setStatus(e.target.value)} className="adm-select">
        <option value="pending">Pendiente</option>
        <option value="paid">Pagado</option>
        <option value="delivered">Entregado</option>
        <option value="cancelled">Cancelado</option>
        <option value="refunded">Reembolsado</option>
      </select>
      <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
        {loading ? 'Guardando...' : 'Actualizar estado'}
      </button>
      {message && <span className="adm-inline-message">{message}</span>}
    </form>
  );
}
