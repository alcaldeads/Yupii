'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getGiftCodes(search?: string, status?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  let query = supabase
    .from('gift_codes')
    .select('*, experiences(title)')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (search) {
    query = query.ilike('code', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getGiftCode(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('gift_codes')
    .select('*, experiences(title, icon), partners:redeemed_at_partner_id(name)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function redeemGiftCode(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const partner_id = formData.get('partner_id') as string;
  const redemption_date = formData.get('redemption_date') as string;
  const redemption_notes = formData.get('redemption_notes') as string;
  const redeemed_by_name = formData.get('redeemed_by_name') as string;

  const { error } = await supabase
    .from('gift_codes')
    .update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
      redeemed_at_partner_id: partner_id || null,
      redemption_date: redemption_date || null,
      redemption_notes: redemption_notes || null,
      redeemed_by_name: redeemed_by_name || null,
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/codigos');
  revalidatePath(`/admin/codigos/${id}`);
  return { success: true };
}

export async function updateGiftCodeStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const updateData: Record<string, unknown> = { status };
  if (status === 'redeemed') {
    updateData.redeemed_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('gift_codes')
    .update(updateData)
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/codigos');
  revalidatePath(`/admin/codigos/${id}`);
  return { success: true };
}

export async function extendGiftCode(id: string, newExpiresAt: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase
    .from('gift_codes')
    .update({ expires_at: newExpiresAt })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/codigos');
  revalidatePath(`/admin/codigos/${id}`);
  return { success: true };
}

export async function cancelGiftCode(id: string) {
  return updateGiftCodeStatus(id, 'cancelled');
}
