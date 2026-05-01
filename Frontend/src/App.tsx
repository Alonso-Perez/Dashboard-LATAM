import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import logoEmpresa from './assets/Selection LATAM.png'; // Asegúrate de que el nombre coincida

// 1. INTERFAZ
interface Candidato {
  id?: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  documento: string;
  rol: string;
  celular: string;
  correo: string;
  linkedin: string;
  github: string;
  motivo: string;
}

// 2. COMPONENTE: FORMULARIO DE REGISTRO
function RegistroCandidatos() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: '', apellidoPaterno: '', apellidoMaterno: '',
    tipoDocumento: 'DNI', documento: '', rol: 'Externo', celular: '', correo: '',
    linkedin: '', github: '', motivo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/api/candidatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // CAMBIO AQUÍ: Ahora redirige a la vista de éxito en lugar de la lista
      navigate('/exito');
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
      <div className="card form-section">
        <h2>Ingrese sus datos de postulación</h2>
        <form onSubmit={handleSubmit} className="candidato-form">
          <div className="form-group">
            <label>Nombres <span className="asterisco-rojo">*</span></label>
            <input name="nombres" value={formData.nombres} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Apellido Paterno <span className="asterisco-rojo">*</span></label>
              <input name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Apellido Materno <span className="asterisco-rojo">*</span></label>
              <input name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: '0.4' }}>
              <label>Tipo <span className="asterisco-rojo">*</span></label>
              <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Número de Documento <span className="asterisco-rojo">*</span></label>
              <input name="documento" value={formData.documento} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rol al que postula <span className="asterisco-rojo">*</span></label>
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="Externo">Candidato Externo</option>
                <option value="Interno">Candidato Interno</option>
              </select>
            </div>
            <div className="form-group">
              <label>Celular</label>
              <input name="celular" placeholder="Opcional" value={formData.celular} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Correo Electrónico <span className="asterisco-rojo">*</span></label>
            <input type="email" name="correo" placeholder="ejemplo@correo.com" value={formData.correo} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn</label>
              <input type="url" name="linkedin" placeholder="URL del perfil (Opcional)" value={formData.linkedin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>GitHub</label>
              <input type="url" name="github" placeholder="URL del perfil (Opcional)" value={formData.github} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Motivos para postular <span className="asterisco-rojo">*</span></label>
            <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
                rows={4}
                className="textarea-input"
            />
          </div>

          <button type="submit" className="submit-btn">Registrar Candidato</button>
        </form>
      </div>
  );
}

// 3. NUEVO COMPONENTE: PANTALLA DE AGRADECIMIENTO
function VistaAgradecimiento() {
  const navigate = useNavigate();
  return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#002b5e', fontSize: '28px', marginBottom: '15px', justifyContent: 'center' }}>
          ¡Registro Exitoso! 🎉
        </h2>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
          Muchas gracias por tu interés en formar parte de nuestro equipo.
          Hemos recibido tu perfil correctamente y actualmente se encuentra <strong>en fase de evaluación</strong>.
          Nos pondremos en contacto contigo pronto.
        </p>
        <button
            onClick={() => navigate('/')}
            className="submit-btn"
            style={{ width: 'auto', padding: '12px 24px', backgroundColor: '#002b5e' }}
        >
          Volver al inicio
        </button>
      </div>
  );
}

// 4. TARJETA DE CANDIDATO
function TarjetaCandidato({ cand }: { cand: Candidato }) {
  const [mostrarMotivo, setMostrarMotivo] = useState(false);

  return (
      <div className="candidato-card">
        <div className="card-header">
          <h3>{cand.nombres} {cand.apellidoPaterno}</h3>
          <span className={`rol-badge ${cand.rol.toLowerCase()}`}>{cand.rol}</span>
        </div>
        <div className="card-body">
          <p><strong>{cand.tipoDocumento}:</strong> {cand.documento}</p>
          <p><strong>Cel:</strong> {cand.celular}</p>
          <p><strong>Mail:</strong> {cand.correo}</p>

          <div className="enlaces-box">
            {cand.linkedin && <a href={cand.linkedin} target="_blank" rel="noreferrer" className="link-badge in">LinkedIn</a>}
            {cand.github && <a href={cand.github} target="_blank" rel="noreferrer" className="link-badge gh">GitHub</a>}
          </div>

          <button
              type="button"
              className="toggle-motivo-btn"
              onClick={() => setMostrarMotivo(!mostrarMotivo)}
          >
            {mostrarMotivo ? 'Ocultar Motivo ⬆' : 'Ver Motivo de Postulación ⬇'}
          </button>

          {mostrarMotivo && (
              <div className="motivo-caja">
                <p>"{cand.motivo}"</p>
              </div>
          )}
        </div>
      </div>
  );
}

// 5. COMPONENTE: LISTA DE CANDIDATOS
function ListaCandidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroDoc, setFiltroDoc] = useState('');

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/candidatos');
        const data = await response.json();
        setCandidatos(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchCandidatos();
  }, []);

  const candidatosFiltrados = candidatos.filter(cand => {
    const cumpleRol = filtroRol ? cand.rol === filtroRol : true;
    const cumpleDoc = filtroDoc ? cand.tipoDocumento === filtroDoc : true;
    return cumpleRol && cumpleDoc;
  });

  return (
      <div className="card list-section">
        <h2>Candidatos Registrados</h2>
        {candidatos.length > 0 && (
            <div className="filters-bar">
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Filtrar por:</span>
              <select value={filtroDoc} onChange={(e) => setFiltroDoc(e.target.value)}>
                <option value="">Todos los Doc.</option>
                <option value="DNI">Solo DNI</option>
                <option value="CE">Solo CE</option>
              </select>
              <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
                <option value="">Todos los Roles</option>
                <option value="Externo">Solo Externos</option>
                <option value="Interno">Solo Internos</option>
              </select>
            </div>
        )}

        {candidatosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron candidatos.</p>
            </div>
        ) : (
            <div className="candidatos-grid">
              {candidatosFiltrados.map((cand) => (
                  <TarjetaCandidato key={cand.id} cand={cand} />
              ))}
            </div>
        )}
      </div>
  );
}

// 6. COMPONENTE PRINCIPAL
function App() {
  return (
      <BrowserRouter>
        <div className="dashboard-container">
          <header
              className="dashboard-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Mantiene los elementos en los extremos
                padding: '10px 20px' // Agrega un poco de aire a los lados
              }}
          >
            {/* MUEVE ESTE DIV A LA IZQUIERDA */}
            <div>
              <h1 style={{ margin: 0 }}>Portal de Reclutamiento</h1>
              <p style={{ margin: 0 }}>Gestión de Talentos</p>
            </div>

            {/* MUEVE LA IMAGEN A LA DERECHA */}
            <img
                src={logoEmpresa}
                alt="Logo Corporativo"
                style={{ height: '120px', objectFit: 'contain' }}
            />
          </header>

          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<RegistroCandidatos />} />
              <Route path="/lista" element={<ListaCandidatos />} />
              <Route path="/exito" element={<VistaAgradecimiento />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;