'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createExperience, updateExperience } from '@/lib/actions/experiences';

type Category = { id: string; name: string };
type Partner = { id: string; name: string };
type Inclusion = { id?: string; description: string; display_order: number };
type ExperiencePartner = { id?: string; partner_id: string; schedule_note: string | null; is_primary: boolean };

type Props = {
  experience?: {
    id: string;
    title: string;
    slug: string;
    category_id: string | null;
    description: string;
    short_description: string | null;
    icon: string | null;
    price_current: number;
    price_original: number | null;
    capacity: string | null;
    location: string | null;
    province: string | null;
    duration: string | null;
    badge: string | null;
    status: string;
    experience_inclusions: Inclusion[];
    experience_partners: ExperiencePartner[];
  };
  categories: Category[];
  partners: Partner[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ExperienceForm({ experience, categories, partners }: Props) {
  const router = useRouter();
  const isEdit = !!experience;

  const [title, setTitle] = useState(experience?.title || '');
  const [slug, setSlug] = useState(experience?.slug || '');
  const [categoryId, setCategoryId] = useState(experience?.category_id || '');
  const [description, setDescription] = useState(experience?.description || '');
  const [shortDescription, setShortDescription] = useState(experience?.short_description || '');
  const [icon, setIcon] = useState(experience?.icon || '');
  const [priceCurrent, setPriceCurrent] = useState(experience?.price_current?.toString() || '');
  const [priceOriginal, setPriceOriginal] = useState(experience?.price_original?.toString() || '');
  const [capacity, setCapacity] = useState(experience?.capacity || '');
  const [location, setLocation] = useState(experience?.location || '');
  const [province, setProvince] = useState(experience?.province || '');
  const [duration, setDuration] = useState(experience?.duration || '');
  const [badge, setBadge] = useState(experience?.badge || '');
  const [status, setStatus] = useState(experience?.status || 'draft');
  const [inclusions, setInclusions] = useState<string[]>(
    experience?.experience_inclusions?.map(i => i.description) || ['']
  );
  const [selectedPartners, setSelectedPartners] = useState<string[]>(
    experience?.experience_partners?.map(p => p.partner_id) || []
  );

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }

  function addInclusion() {
    setInclusions([...inclusions, '']);
  }

  function removeInclusion(idx: number) {
    setInclusions(inclusions.filter((_, i) => i !== idx));
  }

  function updateInclusion(idx: number, value: string) {
    const updated = [...inclusions];
    updated[idx] = value;
    setInclusions(updated);
  }

  function togglePartner(partnerId: string) {
    setSelectedPartners(prev =>
      prev.includes(partnerId) ? prev.filter(p => p !== partnerId) : [...prev, partnerId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.set('title', title);
    formData.set('slug', slug);
    formData.set('category_id', categoryId);
    formData.set('description', description);
    formData.set('short_description', shortDescription);
    formData.set('icon', icon);
    formData.set('price_current', priceCurrent);
    formData.set('price_original', priceOriginal);
    formData.set('capacity', capacity);
    formData.set('location', location);
    formData.set('province', province);
    formData.set('duration', duration);
    formData.set('badge', badge);
    formData.set('status', status);

    inclusions.filter(i => i.trim()).forEach(i => formData.append('inclusions', i));
    selectedPartners.forEach(p => formData.append('partner_ids', p));

    const result = isEdit
      ? await updateExperience(experience!.id, formData)
      : await createExperience(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/experiencias');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-form">
      {error && <div className="adm-alert adm-alert-error">{error}</div>}

      <div className="adm-form-grid">
        <div className="adm-field adm-col-2">
          <label>Titulo *</label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            required
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Slug *</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Categoria</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="adm-select">
            <option value="">Sin categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="adm-field">
          <label>Icono (emoji)</label>
          <input
            type="text"
            value={icon}
            onChange={e => setIcon(e.target.value)}
            placeholder="ej: 🍽️"
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Estado</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="adm-select">
            <option value="draft">Borrador</option>
            <option value="active">Activa</option>
            <option value="paused">Pausada</option>
            <option value="archived">Archivada</option>
          </select>
        </div>

        <div className="adm-field">
          <label>Precio actual (RD$) *</label>
          <input
            type="number"
            step="0.01"
            value={priceCurrent}
            onChange={e => setPriceCurrent(e.target.value)}
            required
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Precio original (RD$)</label>
          <input
            type="number"
            step="0.01"
            value={priceOriginal}
            onChange={e => setPriceOriginal(e.target.value)}
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Capacidad</label>
          <input
            type="text"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            placeholder="ej: 2 personas"
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Ubicacion</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Provincia</label>
          <input
            type="text"
            value={province}
            onChange={e => setProvince(e.target.value)}
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Duracion</label>
          <input
            type="text"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="ej: 3 horas"
            className="adm-input"
          />
        </div>

        <div className="adm-field">
          <label>Etiqueta / Badge</label>
          <input
            type="text"
            value={badge}
            onChange={e => setBadge(e.target.value)}
            placeholder="ej: Exclusivo"
            className="adm-input"
          />
        </div>

        <div className="adm-field adm-col-full">
          <label>Descripcion corta</label>
          <input
            type="text"
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            className="adm-input"
          />
        </div>

        <div className="adm-field adm-col-full">
          <label>Descripcion completa *</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={4}
            className="adm-textarea"
          />
        </div>
      </div>

      <div className="adm-form-section">
        <h3>Que incluye</h3>
        {inclusions.map((inc, idx) => (
          <div key={idx} className="adm-inline-group">
            <input
              type="text"
              value={inc}
              onChange={e => updateInclusion(idx, e.target.value)}
              placeholder="Descripcion de lo que incluye"
              className="adm-input"
            />
            <button type="button" onClick={() => removeInclusion(idx)} className="adm-btn adm-btn-danger adm-btn-sm">
              Quitar
            </button>
          </div>
        ))}
        <button type="button" onClick={addInclusion} className="adm-btn adm-btn-secondary adm-btn-sm">
          Agregar item
        </button>
      </div>

      <div className="adm-form-section">
        <h3>Aliados asociados</h3>
        <div className="adm-checkbox-list">
          {partners.map(p => (
            <label key={p.id} className="adm-checkbox-item">
              <input
                type="checkbox"
                checked={selectedPartners.includes(p.id)}
                onChange={() => togglePartner(p.id)}
              />
              <span>{p.name}</span>
            </label>
          ))}
          {partners.length === 0 && <p className="adm-empty-sm">No hay aliados registrados.</p>}
        </div>
      </div>

      <div className="adm-form-actions">
        <button type="button" onClick={() => router.push('/admin/experiencias')} className="adm-btn adm-btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="adm-btn adm-btn-primary">
          {loading ? 'Guardando...' : isEdit ? 'Actualizar experiencia' : 'Crear experiencia'}
        </button>
      </div>
    </form>
  );
}
