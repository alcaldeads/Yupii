import { notFound } from 'next/navigation';
import { getPartner } from '@/lib/actions/partners';
import PartnerForm from '../PartnerForm';

export default async function EditAliadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let partner;
  try {
    partner = await getPartner(id);
  } catch {
    notFound();
  }

  if (!partner) notFound();

  return (
    <div>
      <div className="adm-page-header">
        <h1>Editar aliado</h1>
      </div>
      <div className="adm-card">
        <PartnerForm partner={partner} />
      </div>
    </div>
  );
}
