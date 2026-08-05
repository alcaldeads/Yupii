'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCorporateClient, updateCorporateClient } from '@/lib/actions/corporate';

type Props = {
  client?: {
    id: string;
    company_name: string;
    rnc: string | null;
    contact_name: string;
    contact_email: string;
    contact_phone: string | null;
    address: string | null;
    city: string | null;
    industry: string | null;
    employee_count: number | null;
    notes: string | null;
    is_active: boolean;
  };
};

export default function CorporateForm({ client }: Props) {
  const router = useRouter();
  const isEdit = !!client;

  const [companyName, setCompanyName] = useState(client?.company_name || '');
  const [rnc, setRnc] = useState(client?.rnc || '');
  const [contactName, setContactName] = useState(client?.contact_name || '');
  const [contactEmail, setContactEmail] = useState(client?.contact_email || '');
  const [contactPhone, setContactPhone] = useState(client?.contact_phone || '');
  const [address, setAddress] = useState(client?.address || '');
  const [city, setCity] = useState(client?.city || '');
  const [industry, setIndustry] = useState(client?.industry || '');
  const [employeeCount, setEmployeeCount] = useState(client?.employee_count?.toString() || '');
  const [notes, setNotes] = useState(client?.notes || '');
  const [isActive, setIsActive] = useState(client?.is_active ?? true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.set('company_name', companyName);
    formData.set('rnc', rnc);
    formData.set('contact_name', contactName);
    formData.set('contact_email', contactEmail);
    formData.set('contact_phone', contactPhone);
    formData.set('address', address);
    formData.set('city', city);
    formData.set('industry', industry);
    formData.set('employee_count', employeeCount);
    formData.set('notes', notes);
    formData.set('is_active', isActive.toString());

    const result = isEdit
      ? await updateCorporateClient(client!.id, formData)
      : await createCorporateClient(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/corporativo');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-form">
      {error && <div className="adm-alert adm-alert-error">{error}</div>}

      <div className="adm-form-grid">
        <div className="adm-field adm-col-2">
          <label>Nombre de la empresa *</label>
          <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required className="adm-input" />
        </div>

        <div className="adm-field">
          <label>RNC</label>
          <input type="text" value={rnc} onChange={e => setRnc(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Industria</label>
          <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Nombre de contacto *</label>
          <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} required className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Email de contacto *</label>
          <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Telefono</label>
          <input type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Direccion</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Ciudad</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Cantidad de empleados</label>
          <input type="number" value={employeeCount} onChange={e => setEmployeeCount(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field adm-col-full">
          <label>Notas</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="adm-textarea" />
        </div>

        {isEdit && (
          <div className="adm-field">
            <label className="adm-checkbox-item">
              <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
              <span>Activo</span>
            </label>
          </div>
        )}
      </div>

      <div className="adm-form-actions">
        <button type="button" onClick={() => router.push('/admin/corporativo')} className="adm-btn adm-btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
          {loading ? 'Guardando...' : isEdit ? 'Actualizar cliente' : 'Crear cliente'}
        </button>
      </div>
    </form>
  );
}
