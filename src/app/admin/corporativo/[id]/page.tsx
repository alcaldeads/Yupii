import { notFound } from 'next/navigation';
import { getCorporateClient } from '@/lib/actions/corporate';
import CorporateForm from '../CorporateForm';

export default async function EditCorporativoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let client;
  try {
    client = await getCorporateClient(id);
  } catch {
    notFound();
  }

  if (!client) notFound();

  return (
    <div>
      <div className="adm-page-header">
        <h1>Editar cliente corporativo</h1>
      </div>
      <div className="adm-card">
        <CorporateForm client={client} />
      </div>
    </div>
  );
}
