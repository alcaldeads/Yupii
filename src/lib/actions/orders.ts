'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getOrders(search?: string, status?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (search) {
    query = query.or(`order_number.ilike.%${search}%,buyer_name.ilike.%${search}%,buyer_email.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getOrder(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, experiences(title, icon))')
    .eq('id', id)
    .single();

  if (error) throw error;

  // Get associated gift codes
  const { data: codes } = await supabase
    .from('gift_codes')
    .select('id, code, status, experience_id, expires_at, redeemed_at')
    .in('order_item_id', (data.order_items || []).map((i: { id: string }) => i.id));

  return { ...data, gift_codes: codes || [] };
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autorizado' };

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/pedidos');
  revalidatePath(`/admin/pedidos/${id}`);
  return { success: true };
}
