import { getCategories } from '@/lib/actions/categories';
import { getPartners } from '@/lib/actions/partners';
import ExperienceForm from '../ExperienceForm';

export default async function NuevaExperienciaPage() {
  let categories: { id: string; name: string }[] = [];
  let partners: { id: string; name: string }[] = [];

  try {
    categories = (await getCategories()).map(c => ({ id: c.id, name: c.name }));
  } catch {
    // Categories unavailable
  }

  try {
    partners = (await getPartners()).map(p => ({ id: p.id, name: p.name }));
  } catch {
    // Partners unavailable
  }

  return (
    <div>
      <div className="adm-page-header">
        <h1>Nueva experiencia</h1>
      </div>
      <div className="adm-card">
        <ExperienceForm categories={categories} partners={partners} />
      </div>
    </div>
  );
}
