'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPartners(search?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  let query = supabase
    .from('partners')
    .select('*')
    .order('name', { ascending: true });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getPartner(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createPartner(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const contact_name = formData.get('contact_name') as string;
  const contact_email = formData.get('contact_email') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const province = formData.get('province') as string;
  const commission_str = formData.get('commission_percent') as string;
  const commission_percent = commission_str ? parseFloat(commission_str) : 25;
  const website = formData.get('website') as string;
  const instagram = formData.get('instagram') as string;

  if (!name || !slug || !type) {
    return { error: 'Nombre, slug y tipo son requeridos.' };
  }

  const { data, error } = await supabase
    .from('partners')
    .insert({
      name, slug, type,
      description: description || null,
      contact_name: contact_name || null,
      contact_email: contact_email || null,
      contact_phone: contact_phone || null,
      address: address || null,
      city: city || null,
      province: province || null,
      commission_percent,
      website: website || null,
      instagram: instagram || null,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/aliados');
  return { success: true, id: data.id };
}

export async function updatePartner(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const contact_name = formData.get('contact_name') as string;
  const contact_email = formData.get('contact_email') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const province = formData.get('province') as string;
  const commission_str = formData.get('commission_percent') as string;
  const commission_percent = commission_str ? parseFloat(commission_str) : 25;
  const is_active = formData.get('is_active') === 'true';
  const website = formData.get('website') as string;
  const instagram = formData.get('instagram') as string;

  if (!name || !slug || !type) {
    return { error: 'Nombre, slug y tipo son requeridos.' };
  }

  const { error } = await supabase
    .from('partners')
    .update({
      name, slug, type,
      description: description || null,
      contact_name: contact_name || null,
      contact_email: contact_email || null,
      contact_phone: contact_phone || null,
      address: address || null,
      city: city || null,
      province: province || null,
      commission_percent,
      is_active,
      website: website || null,
      instagram: instagram || null,
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/aliados');
  revalidatePath(`/admin/aliados/${id}`);
  return { success: true };
}

export async function deletePartner(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase.from('partners').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/aliados');
  return { success: true };
}
