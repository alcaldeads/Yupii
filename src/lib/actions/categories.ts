'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const icon = formData.get('icon') as string;
  const display_order_str = formData.get('display_order') as string;
  const display_order = display_order_str ? parseInt(display_order_str) : 0;

  if (!name || !slug) {
    return { error: 'Nombre y slug son requeridos.' };
  }

  const { error } = await supabase
    .from('categories')
    .insert({ name, slug, icon: icon || null, display_order });

  if (error) return { error: error.message };

  revalidatePath('/admin/categorias');
  return { success: true };
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;
  const display_order_str = formData.get('display_order') as string;
  const display_order = display_order_str ? parseInt(display_order_str) : 0;
  const is_active = formData.get('is_active') === 'true';

  if (!name) {
    return { error: 'Nombre es requerido.' };
  }

  const { error } = await supabase
    .from('categories')
    .update({ name, icon: icon || null, display_order, is_active })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/categorias');
  return { success: true };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/categorias');
  return { success: true };
}
