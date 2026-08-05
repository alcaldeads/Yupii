'use client';

import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories';

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [editOrder, setEditOrder] = useState('0');
  const [editActive, setEditActive] = useState(true);

  // New category state
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newOrder, setNewOrder] = useState('0');
  const [error, setError] = useState('');

  async function loadData() {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data as Category[]);
    } catch {
      // Error loading
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditIcon(cat.icon || '');
    setEditOrder(cat.display_order.toString());
    setEditActive(cat.is_active);
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setError('');
  }

  async function saveEdit(id: string) {
    const formData = new FormData();
    formData.set('name', editName);
    formData.set('icon', editIcon);
    formData.set('display_order', editOrder);
    formData.set('is_active', editActive.toString());

    const result = await updateCategory(id, formData);
    if (result.error) {
      setError(result.error);
    } else {
      setEditingId(null);
      await loadData();
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.set('name', newName);
    formData.set('slug', slugify(newName));
    formData.set('icon', newIcon);
    formData.set('display_order', newOrder);

    const result = await createCategory(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setNewName('');
      setNewIcon('');
      setNewOrder('0');
      await loadData();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Estas seguro de eliminar esta categoria?')) return;
    const result = await deleteCategory(id);
    if (result.success) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Categorias</h1>
      </div>

      {error && <div className="adm-alert adm-alert-error">{error}</div>}

      <div className="adm-card">
        {loading ? (
          <p className="adm-empty">Cargando...</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Icono</th>
                  <th>Nombre</th>
                  <th>Slug</th>
                  <th>Orden</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    {editingId === cat.id ? (
                      <>
                        <td>
                          <input type="text" value={editIcon} onChange={e => setEditIcon(e.target.value)} className="adm-input adm-input-sm" style={{ width: 60 }} />
                        </td>
                        <td>
                          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="adm-input adm-input-sm" />
                        </td>
                        <td>{cat.slug}</td>
                        <td>
                          <input type="number" value={editOrder} onChange={e => setEditOrder(e.target.value)} className="adm-input adm-input-sm" style={{ width: 60 }} />
                        </td>
                        <td>
                          <label className="adm-checkbox-item">
                            <input type="checkbox" checked={editActive} onChange={e => setEditActive(e.target.checked)} />
                            <span>{editActive ? 'Activa' : 'Inactiva'}</span>
                          </label>
                        </td>
                        <td>
                          <div className="adm-action-btns">
                            <button onClick={() => saveEdit(cat.id)} className="adm-btn adm-btn-primary adm-btn-sm">Guardar</button>
                            <button onClick={cancelEdit} className="adm-btn adm-btn-ghost adm-btn-sm">Cancelar</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td><span style={{ fontSize: '1.3rem' }}>{cat.icon || '-'}</span></td>
                        <td>{cat.name}</td>
                        <td><code className="adm-code">{cat.slug}</code></td>
                        <td>{cat.display_order}</td>
                        <td>
                          <span className={`adm-badge ${cat.is_active ? 'adm-badge-active' : 'adm-badge-paused'}`}>
                            {cat.is_active ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <div className="adm-action-btns">
                            <button onClick={() => startEdit(cat)} className="adm-btn adm-btn-ghost adm-btn-sm">Editar</button>
                            <button onClick={() => handleDelete(cat.id)} className="adm-btn adm-btn-danger adm-btn-sm">Eliminar</button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {/* New category row */}
                <tr>
                  <td colSpan={6}>
                    <form onSubmit={handleCreate} className="adm-inline-create">
                      <input
                        type="text"
                        value={newIcon}
                        onChange={e => setNewIcon(e.target.value)}
                        placeholder="Icono"
                        className="adm-input adm-input-sm"
                        style={{ width: 60 }}
                      />
                      <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Nombre de la categoria"
                        required
                        className="adm-input adm-input-sm"
                        style={{ flex: 1 }}
                      />
                      <input
                        type="number"
                        value={newOrder}
                        onChange={e => setNewOrder(e.target.value)}
                        placeholder="Orden"
                        className="adm-input adm-input-sm"
                        style={{ width: 70 }}
                      />
                      <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm">
                        Agregar
                      </button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
