import { getSettings } from '@/lib/actions/settings';
import SettingsForm from './SettingsForm';

export default async function ConfiguracionPage() {
  let settings = null;
  try {
    settings = await getSettings();
  } catch {
    // Settings unavailable
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Configuracion del negocio</h1>
      </div>
      <div className="adm-card">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
