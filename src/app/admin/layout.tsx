import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminShell from './AdminShell';

export const metadata = {
  title: 'Yupii Admin',
  description: 'Panel de administracion Yupii',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page doesn't need the shell
  // We detect this by checking if user is null — middleware handles redirect
  if (!user) {
    return <>{children}</>;
  }

  return <AdminShell userEmail={user.email || ''}>{children}</AdminShell>;
}
