import { notFound } from 'next/navigation';
import { getGiftCode } from '@/lib/actions/gift-codes';
import { getPartners } from '@/lib/actions/partners';
import Link from 'next/link';
import CodeActions from './CodeActions';

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
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function CodigoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let code;
  try {
    code = await getGiftCode(id);
  } catch {
    notFound();
  }

  if (!code) notFound();

  let partners: { id: string; name: string }[] = [];
  try {
    partners = (await getPartners()).map(p => ({ id: p.id, name: p.name }));
  } catch {
    // Partners unavailable
  }

  const partnerName = code.partners && typeof code.partners === 'object' && 'name' in code.partners
    ? (code.partners as { name: string }).name
    : null;

  return (
    <div>
      <div className="adm-page-header">
        <h1>Codigo: {code.code}</h1>
        <Link href="/admin/codigos" className="adm-btn adm-btn-secondary">Volver a codigos</Link>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card">
          <div className="adm-card-header">
            <h2>Informacion del codigo</h2>
            <span className={`adm-badge adm-badge-${code.status}`}>
              {STATUS_LABELS[code.status] || code.status}
            </span>
          </div>
          <div className="adm-detail-list">
            <div className="adm-detail-row">
              <span className="adm-detail-label">Codigo:</span>
              <code className="adm-code adm-code-lg">{code.code}</code>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Experiencia:</span>
              <span>
                {code.experiences?.icon && <span style={{ marginRight: 6 }}>{code.experiences.icon}</span>}
                {code.experiences?.title || '-'}
              </span>
            </div>
            {code.amount && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Monto:</span>
                <span>RD${Number(code.amount).toLocaleString('es-DO')}</span>
              </div>
            )}
            <div className="adm-detail-row">
              <span className="adm-detail-label">Emitido:</span>
              <span>{formatDate(code.issued_at)}</span>
            </div>
            <div className="adm-detail-row">
              <span className="adm-detail-label">Expira:</span>
              <span>{formatDate(code.expires_at)}</span>
            </div>
            {code.redeemed_at && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Canjeado:</span>
                <span>{formatDate(code.redeemed_at)}</span>
              </div>
            )}
            {code.redeemed_by_name && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Canjeado por:</span>
                <span>{code.redeemed_by_name}</span>
              </div>
            )}
            {partnerName && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Aliado de canje:</span>
                <span>{partnerName}</span>
              </div>
            )}
            {code.redemption_notes && (
              <div className="adm-detail-row">
                <span className="adm-detail-label">Notas:</span>
                <span>{code.redemption_notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="adm-card">
          <h2 className="adm-card-title">Acciones</h2>
          <CodeActions codeId={code.id} currentStatus={code.status} expiresAt={code.expires_at} partners={partners} />
        </div>
      </div>
    </div>
  );
}
