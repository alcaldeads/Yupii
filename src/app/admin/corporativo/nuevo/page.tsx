import CorporateForm from '../CorporateForm';

export default function NuevoCorporativoPage() {
  return (
    <div>
      <div className="adm-page-header">
        <h1>Nuevo cliente corporativo</h1>
      </div>
      <div className="adm-card">
        <CorporateForm />
      </div>
    </div>
  );
}
