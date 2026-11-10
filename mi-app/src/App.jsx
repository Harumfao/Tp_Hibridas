import { useState, useEffect } from 'react';
import './App.css';

function App() {
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

        ? `${apiUrl}/api/campos?ubicacion=${filtro}`
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
    <div>
      <div>
        <label htmlFor="filtroInput">Filtrar por ubicación:</label>
        <input 
          id="filtroInput"
          type="text" 
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder=""
        />
      </div>

      {cargando && <p>Cargando datos</p>}

      {error && <p> Error: {error}</p>}

      {!cargando && !error && (
        <div>

            <ul>
              {datos.map((item) => (
                <div key={item._id || item.id} style={{border: '1px solid #e0e0e0',margin: '15px',}}>
                  <p>{item.nombre}</p>
                  <p>Ubicación: {item.ubicacion}</p>
                  <p>Descripción: {item.descripcion}</p>
                  <p>Horario: {item.horario}</p>
                  <p>Contacto: {item.contacto}</p>
                </div>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default App;