'use server';

import { createClient } from '@/lib/supabase/server';

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const [expRes, codesRes, ordersRes, revenueRes] = await Promise.all([
    supabase.from('experiences').select('id', { count: 'exact', head: true }),
    supabase.from('gift_codes').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('status', 'paid'),
  ]);

  const revenue = (revenueRes.data || []).reduce((sum, o) => sum + Number(o.total), 0);

  return {
    totalExperiences: expRes.count || 0,
    activeCodes: codesRes.count || 0,
    totalOrders: ordersRes.count || 0,
    revenue,
  };
}

export async function getRecentOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autorizado');

  const { data, error } = await supabase
    .from('orders')
    .select('id, order_number, buyer_name, total, status, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data || [];
}
