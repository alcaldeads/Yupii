'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getExperiences(search?: string, status?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  let query = supabase
    .from('experiences')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getExperience(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('experiences')
    .select('*, experience_inclusions(id, description, display_order), experience_partners(id, partner_id, schedule_note, is_primary)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category_id = formData.get('category_id') as string;
  const description = formData.get('description') as string;
  const short_description = formData.get('short_description') as string;
  const icon = formData.get('icon') as string;
  const price_current = parseFloat(formData.get('price_current') as string);
  const price_original_str = formData.get('price_original') as string;
  const price_original = price_original_str ? parseFloat(price_original_str) : null;
  const capacity = formData.get('capacity') as string;
  const location = formData.get('location') as string;
  const province = formData.get('province') as string;
  const duration = formData.get('duration') as string;
  const badge = formData.get('badge') as string;
  const status = formData.get('status') as string;

  if (!title || !slug || !description || !price_current) {
    return { error: 'Campos requeridos: titulo, slug, descripcion, precio.' };
  }

  const { data: exp, error } = await supabase
    .from('experiences')
    .insert({
      title, slug, category_id: category_id || null, description,
      short_description: short_description || null, icon: icon || null,
      price_current, price_original,
      capacity: capacity || null, location: location || null,
      province: province || null, duration: duration || null,
      badge: badge || null, status: status || 'draft',
    })
    .select('id')
    .single();

  if (error) return { error: error.message };

  // Save inclusions
  const inclusions = formData.getAll('inclusions') as string[];
  if (inclusions.length > 0) {
    const inclusionRows = inclusions
      .filter(i => i.trim())
      .map((desc, idx) => ({
        experience_id: exp.id,
        description: desc,
        display_order: idx,
      }));
    if (inclusionRows.length > 0) {
      await supabase.from('experience_inclusions').insert(inclusionRows);
    }
  }

  // Save partner associations
  const partners = formData.getAll('partner_ids') as string[];
  if (partners.length > 0) {
    const partnerRows = partners.filter(p => p).map(pid => ({
      experience_id: exp.id,
      partner_id: pid,
    }));
    if (partnerRows.length > 0) {
      await supabase.from('experience_partners').insert(partnerRows);
    }
  }

  revalidatePath('/admin/experiencias');
  return { success: true, id: exp.id };
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category_id = formData.get('category_id') as string;
  const description = formData.get('description') as string;
  const short_description = formData.get('short_description') as string;
  const icon = formData.get('icon') as string;
  const price_current = parseFloat(formData.get('price_current') as string);
  const price_original_str = formData.get('price_original') as string;
  const price_original = price_original_str ? parseFloat(price_original_str) : null;
  const capacity = formData.get('capacity') as string;
  const location = formData.get('location') as string;
  const province = formData.get('province') as string;
  const duration = formData.get('duration') as string;
  const badge = formData.get('badge') as string;
  const status = formData.get('status') as string;

  if (!title || !slug || !description || !price_current) {
    return { error: 'Campos requeridos: titulo, slug, descripcion, precio.' };
  }

  const { error } = await supabase
    .from('experiences')
    .update({
      title, slug, category_id: category_id || null, description,
      short_description: short_description || null, icon: icon || null,
      price_current, price_original,
      capacity: capacity || null, location: location || null,
      province: province || null, duration: duration || null,
      badge: badge || null, status: status || 'draft',
    })
    .eq('id', id);

  if (error) return { error: error.message };

  // Replace inclusions
  await supabase.from('experience_inclusions').delete().eq('experience_id', id);
  const inclusions = formData.getAll('inclusions') as string[];
  if (inclusions.length > 0) {
    const inclusionRows = inclusions
      .filter(i => i.trim())
      .map((desc, idx) => ({
        experience_id: id,
        description: desc,
        display_order: idx,
      }));
    if (inclusionRows.length > 0) {
      await supabase.from('experience_inclusions').insert(inclusionRows);
    }
  }

  // Replace partner associations
  await supabase.from('experience_partners').delete().eq('experience_id', id);
  const partners = formData.getAll('partner_ids') as string[];
  if (partners.length > 0) {
    const partnerRows = partners.filter(p => p).map(pid => ({
      experience_id: id,
      partner_id: pid,
    }));
    if (partnerRows.length > 0) {
      await supabase.from('experience_partners').insert(partnerRows);
    }
  }

  revalidatePath('/admin/experiencias');
  revalidatePath(`/admin/experiencias/${id}`);
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/experiencias');
  return { success: true };
}
