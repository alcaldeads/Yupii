'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getCorporateClients(search?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  let query = supabase
    .from('corporate_clients')
    .select('*')
    .order('company_name', { ascending: true });

  if (search) {
    query = query.ilike('company_name', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getCorporateClient(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('corporate_clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCorporateClient(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const company_name = formData.get('company_name') as string;
  const rnc = formData.get('rnc') as string;
  const contact_name = formData.get('contact_name') as string;
  const contact_email = formData.get('contact_email') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const industry = formData.get('industry') as string;
  const employee_count_str = formData.get('employee_count') as string;
  const employee_count = employee_count_str ? parseInt(employee_count_str) : null;
  const notes = formData.get('notes') as string;

  if (!company_name || !contact_name || !contact_email) {
    return { error: 'Empresa, nombre de contacto y email son requeridos.' };
  }

  const { data, error } = await supabase
    .from('corporate_clients')
    .insert({
      company_name,
      rnc: rnc || null,
      contact_name,
      contact_email,
      contact_phone: contact_phone || null,
      address: address || null,
      city: city || null,
      industry: industry || null,
      employee_count,
      notes: notes || null,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/corporativo');
  return { success: true, id: data.id };
}

export async function updateCorporateClient(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const company_name = formData.get('company_name') as string;
  const rnc = formData.get('rnc') as string;
  const contact_name = formData.get('contact_name') as string;
  const contact_email = formData.get('contact_email') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const industry = formData.get('industry') as string;
  const employee_count_str = formData.get('employee_count') as string;
  const employee_count = employee_count_str ? parseInt(employee_count_str) : null;
  const notes = formData.get('notes') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!company_name || !contact_name || !contact_email) {
    return { error: 'Empresa, nombre de contacto y email son requeridos.' };
  }

  const { error } = await supabase
    .from('corporate_clients')
    .update({
      company_name,
      rnc: rnc || null,
      contact_name,
      contact_email,
      contact_phone: contact_phone || null,
      address: address || null,
      city: city || null,
      industry: industry || null,
      employee_count,
      notes: notes || null,
      is_active,
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/corporativo');
  return { success: true };
}

export async function deleteCorporateClient(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase.from('corporate_clients').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/corporativo');
  return { success: true };
}
