'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPartner, updatePartner } from '@/lib/actions/partners';

type Props = {
  partner?: {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string | null;
    contact_name: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    address: string | null;
    city: string | null;
    province: string | null;
    commission_percent: number;
    is_active: boolean;
    website: string | null;
    instagram: string | null;
  };
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function PartnerForm({ partner }: Props) {
  const router = useRouter();
  const isEdit = !!partner;

  const [name, setName] = useState(partner?.name || '');
  const [slug, setSlug] = useState(partner?.slug || '');
  const [type, setType] = useState(partner?.type || 'restaurant');
  const [description, setDescription] = useState(partner?.description || '');
  const [contactName, setContactName] = useState(partner?.contact_name || '');
  const [contactEmail, setContactEmail] = useState(partner?.contact_email || '');
  const [contactPhone, setContactPhone] = useState(partner?.contact_phone || '');
  const [address, setAddress] = useState(partner?.address || '');
  const [city, setCity] = useState(partner?.city || '');
  const [province, setProvince] = useState(partner?.province || '');
  const [commission, setCommission] = useState(partner?.commission_percent?.toString() || '25');
  const [isActive, setIsActive] = useState(partner?.is_active ?? true);
  const [website, setWebsite] = useState(partner?.website || '');
  const [instagram, setInstagram] = useState(partner?.instagram || '');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!isEdit) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.set('name', name);
    formData.set('slug', slug);
    formData.set('type', type);
    formData.set('description', description);
    formData.set('contact_name', contactName);
    formData.set('contact_email', contactEmail);
    formData.set('contact_phone', contactPhone);
    formData.set('address', address);
    formData.set('city', city);
    formData.set('province', province);
    formData.set('commission_percent', commission);
    formData.set('is_active', isActive.toString());
    formData.set('website', website);
    formData.set('instagram', instagram);

    const result = isEdit
      ? await updatePartner(partner!.id, formData)
      : await createPartner(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/aliados');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-form">
      {error && <div className="adm-alert adm-alert-error">{error}</div>}

      <div className="adm-form-grid">
        <div className="adm-field">
          <label>Nombre *</label>
          <input type="text" value={name} onChange={e => handleNameChange(e.target.value)} required className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Slug *</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Tipo *</label>
          <select value={type} onChange={e => setType(e.target.value)} className="adm-select">
            <option value="restaurant">Restaurante</option>
            <option value="spa">Spa</option>
            <option value="hotel">Hotel</option>
            <option value="adventure">Aventura</option>
            <option value="nautical">Nautico</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <div className="adm-field">
          <label>Comision %</label>
          <input type="number" step="0.01" value={commission} onChange={e => setCommission(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field adm-col-full">
          <label>Descripcion</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="adm-textarea" />
        </div>

        <div className="adm-field">
          <label>Nombre de contacto</label>
          <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Email de contacto</label>
          <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Telefono de contacto</label>
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
          <label>Provincia</label>
          <input type="text" value={province} onChange={e => setProvince(e.target.value)} className="adm-input" />
        </div>

        <div className="adm-field">
          <label>Sitio web</label>
          <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="adm-input" placeholder="https://" />
        </div>

        <div className="adm-field">
          <label>Instagram</label>
          <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className="adm-input" placeholder="@usuario" />
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
        <button type="button" onClick={() => router.push('/admin/aliados')} className="adm-btn adm-btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
          {loading ? 'Guardando...' : isEdit ? 'Actualizar aliado' : 'Crear aliado'}
        </button>
      </div>
    </form>
  );
}
