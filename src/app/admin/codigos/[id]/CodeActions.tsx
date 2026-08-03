'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { redeemGiftCode, extendGiftCode, cancelGiftCode } from '@/lib/actions/gift-codes';

type Props = {
  codeId: string;
  currentStatus: string;
  expiresAt: string;
  partners: { id: string; name: string }[];
};

export default function CodeActions({ codeId, currentStatus, expiresAt, partners }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redeem form state
  const [showRedeem, setShowRedeem] = useState(false);
  const [partnerId, setPartnerId] = useState('');
  const [redemptionDate, setRedemptionDate] = useState('');
  const [redeemedByName, setRedeemedByName] = useState('');
  const [redemptionNotes, setRedemptionNotes] = useState('');

  // Extend form state
  const [showExtend, setShowExtend] = useState(false);
  const [newExpiry, setNewExpiry] = useState(expiresAt.split('T')[0]);

  async function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.set('partner_id', partnerId);
    formData.set('redemption_date', redemptionDate);
    formData.set('redeemed_by_name', redeemedByName);
    formData.set('redemption_notes', redemptionNotes);

    const result = await redeemGiftCode(codeId, formData);
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Codigo marcado como canjeado.');
      setShowRedeem(false);
      router.refresh();
    }
    setLoading(false);
  }

  async function handleExtend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await extendGiftCode(codeId, new Date(newExpiry).toISOString());
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Vigencia extendida correctamente.');
      setShowExtend(false);
      router.refresh();
    }
    setLoading(false);
  }

  async function handleCancel() {
    if (!confirm('Estas seguro de cancelar este codigo?')) return;
    setLoading(true);
    setMessage('');

    const result = await cancelGiftCode(codeId);
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Codigo cancelado.');
      router.refresh();
    }
    setLoading(false);
  }

  const canRedeem = currentStatus === 'active' || currentStatus === 'reserved';
  const canExtend = currentStatus !== 'redeemed' && currentStatus !== 'cancelled';
  const canCancel = currentStatus !== 'redeemed' && currentStatus !== 'cancelled';

  return (
    <div className="adm-code-actions">
      {message && <div className="adm-alert adm-alert-info">{message}</div>}

      <div className="adm-action-buttons-vertical">
        {canRedeem && (
          <button onClick={() => { setShowRedeem(!showRedeem); setShowExtend(false); }} className="adm-btn adm-btn-primary">
            Marcar como canjeado
          </button>
        )}
        {canExtend && (
          <button onClick={() => { setShowExtend(!showExtend); setShowRedeem(false); }} className="adm-btn adm-btn-secondary">
            Extender vigencia
          </button>
        )}
        {canCancel && (
          <button onClick={handleCancel} disabled={loading} className="adm-btn adm-btn-danger">
            Cancelar codigo
          </button>
        )}
      </div>

      {showRedeem && (
        <form onSubmit={handleRedeem} className="adm-form adm-form-compact">
          <h3>Registrar canje</h3>
          <div className="adm-field">
            <label>Nombre de quien canjea</label>
            <input type="text" value={redeemedByName} onChange={e => setRedeemedByName(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Aliado donde se canjea</label>
            <select value={partnerId} onChange={e => setPartnerId(e.target.value)} className="adm-select">
              <option value="">Seleccionar aliado</option>
              {partners.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="adm-field">
            <label>Fecha de canje</label>
            <input type="date" value={redemptionDate} onChange={e => setRedemptionDate(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Notas</label>
            <textarea value={redemptionNotes} onChange={e => setRedemptionNotes(e.target.value)} rows={2} className="adm-textarea" />
          </div>
          <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
            {loading ? 'Guardando...' : 'Confirmar canje'}
          </button>
        </form>
      )}

      {showExtend && (
        <form onSubmit={handleExtend} className="adm-form adm-form-compact">
          <h3>Extender vigencia</h3>
          <div className="adm-field">
            <label>Nueva fecha de vencimiento</label>
            <input type="date" value={newExpiry} onChange={e => setNewExpiry(e.target.value)} required className="adm-input" />
          </div>
          <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
            {loading ? 'Guardando...' : 'Confirmar extension'}
          </button>
        </form>
      )}
    </div>
  );
}
