'use client';

import { useState } from 'react';
import { updateSettings } from '@/lib/actions/settings';

type Props = {
  settings: {
    business_name: string;
    tagline: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    whatsapp: string | null;
    instagram: string | null;
    address: string | null;
    tax_rate: number;
    default_code_validity_days: number;
    gift_code_prefix: string;
    notification_email: string | null;
  } | null;
};

export default function SettingsForm({ settings }: Props) {
  const [businessName, setBusinessName] = useState(settings?.business_name || 'Yupii');
  const [tagline, setTagline] = useState(settings?.tagline || '');
  const [contactEmail, setContactEmail] = useState(settings?.contact_email || '');
  const [contactPhone, setContactPhone] = useState(settings?.contact_phone || '');
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '');
  const [instagram, setInstagram] = useState(settings?.instagram || '');
  const [address, setAddress] = useState(settings?.address || '');
  const [taxRate, setTaxRate] = useState(settings?.tax_rate?.toString() || '18');
  const [validityDays, setValidityDays] = useState(settings?.default_code_validity_days?.toString() || '365');
  const [codePrefix, setCodePrefix] = useState(settings?.gift_code_prefix || 'YUPII');
  const [notificationEmail, setNotificationEmail] = useState(settings?.notification_email || '');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData();
    formData.set('business_name', businessName);
    formData.set('tagline', tagline);
    formData.set('contact_email', contactEmail);
    formData.set('contact_phone', contactPhone);
    formData.set('whatsapp', whatsapp);
    formData.set('instagram', instagram);
    formData.set('address', address);
    formData.set('tax_rate', taxRate);
    formData.set('default_code_validity_days', validityDays);
    formData.set('gift_code_prefix', codePrefix);
    formData.set('notification_email', notificationEmail);

    const result = await updateSettings(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess('Configuracion guardada correctamente.');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="adm-form">
      {error && <div className="adm-alert adm-alert-error">{error}</div>}
      {success && <div className="adm-alert adm-alert-success">{success}</div>}

      <div className="adm-form-section">
        <h3>Informacion general</h3>
        <div className="adm-form-grid">
          <div className="adm-field">
            <label>Nombre del negocio</label>
            <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Eslogan</label>
            <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} className="adm-input" />
          </div>
        </div>
      </div>

      <div className="adm-form-section">
        <h3>Contacto</h3>
        <div className="adm-form-grid">
          <div className="adm-field">
            <label>Email de contacto</label>
            <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Telefono</label>
            <input type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>WhatsApp</label>
            <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Instagram</label>
            <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className="adm-input" placeholder="@usuario" />
          </div>
          <div className="adm-field adm-col-full">
            <label>Direccion</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="adm-input" />
          </div>
        </div>
      </div>

      <div className="adm-form-section">
        <h3>Configuracion de codigos</h3>
        <div className="adm-form-grid">
          <div className="adm-field">
            <label>Tasa de impuesto (%)</label>
            <input type="number" step="0.01" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Dias de validez por defecto</label>
            <input type="number" value={validityDays} onChange={e => setValidityDays(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Prefijo de codigos</label>
            <input type="text" value={codePrefix} onChange={e => setCodePrefix(e.target.value)} className="adm-input" />
          </div>
          <div className="adm-field">
            <label>Email de notificaciones</label>
            <input type="email" value={notificationEmail} onChange={e => setNotificationEmail(e.target.value)} className="adm-input" />
          </div>
        </div>
      </div>

      <div className="adm-form-actions">
        <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
          {loading ? 'Guardando...' : 'Guardar configuracion'}
        </button>
      </div>
    </form>
  );
}
