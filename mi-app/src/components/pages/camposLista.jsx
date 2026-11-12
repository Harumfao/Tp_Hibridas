import { useState, useEffect } from 'react';

export function Catalogo() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const datosAPI = async () => {
      setCargando(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const url = filtro
          ? `${apiUrl}/api/campos?ubicacion=${encodeURIComponent(filtro)}`
          : `${apiUrl}/api/campos`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error en el servidor: ${respuesta.status} (${respuesta.statusText})`);
        }

        const resultado = await respuesta.json();
        setDatos(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    datosAPI();
  }, [filtro]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Campos</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filtroInput" style={{ marginRight: '10px' }}>Filtrar por ubicación:</label>
        <input 
          id="filtroInput"
          type="text" 
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Ej: quilmes..."
          style={{ padding: '6px' }}
        />
      </div>

      {cargando && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!cargando && !error && (
        <div>
          {datos.length === 0 ? (
            <p>No se encontraron campos.</p>
          ) : (
            <ul>
              {datos.map((item) => (
                <div key={item._id || item.id} style={{ border: '1px solid #e0e0e0', margin: '15px 0', padding: '15px', borderRadius: '6px' }}>
                  <p><strong>{item.nombre}</strong></p>
                  <p>Ubicación: {item.ubicacion}</p>
                  <p>Descripción: {item.descripcion}</p>
                  <p>Horario: {item.horario}</p>
                  <p>Contacto: {item.contacto}</p>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}