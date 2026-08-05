'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const business_name = formData.get('business_name') as string;
  const tagline = formData.get('tagline') as string;
  const contact_email = formData.get('contact_email') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const instagram = formData.get('instagram') as string;
  const address = formData.get('address') as string;
  const tax_rate_str = formData.get('tax_rate') as string;
  const tax_rate = tax_rate_str ? parseFloat(tax_rate_str) : 18;
  const default_code_validity_days_str = formData.get('default_code_validity_days') as string;
  const default_code_validity_days = default_code_validity_days_str ? parseInt(default_code_validity_days_str) : 365;
  const gift_code_prefix = formData.get('gift_code_prefix') as string;
  const notification_email = formData.get('notification_email') as string;

  // Get current settings to find the id
  const { data: current } = await supabase
    .from('business_settings')
    .select('id')
    .limit(1)
    .single();

  if (!current) {
    // Insert if no settings exist
    const { error } = await supabase.from('business_settings').insert({
      business_name, tagline, contact_email, contact_phone, whatsapp,
      instagram, address, tax_rate, default_code_validity_days,
      gift_code_prefix, notification_email,
    });
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('business_settings')
      .update({
        business_name, tagline: tagline || null,
        contact_email: contact_email || null,
        contact_phone: contact_phone || null,
        whatsapp: whatsapp || null,
        instagram: instagram || null,
        address: address || null,
        tax_rate,
        default_code_validity_days,
        gift_code_prefix: gift_code_prefix || 'YUPII',
        notification_email: notification_email || null,
      })
      .eq('id', current.id);

    if (error) return { error: error.message };
  }

  revalidatePath('/admin/configuracion');
  return { success: true };
}
