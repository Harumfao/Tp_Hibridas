import { useState } from 'react';
import { Contenedor } from '../contenedor';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setMensajeExito(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      const respuesta = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || `Error en el servidor: ${respuesta.status} (${respuesta.statusText})`);
      }

      if (resultado.token) {
        localStorage.setItem('token', resultado.token);
        setMensajeExito('¡Inicio de sesión exitoso! Token guardado correctamente.');
      } else {
        setMensajeExito('¡Inicio de sesión exitoso!');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (

    <Contenedor titulo="Iniciar Sesión">
      {error && <p style={{ color: 'red', background: '#ffe6e6', padding: '10px', borderRadius: '4px' }}>Error: {error}</p>}
      {mensajeExito && <p style={{ color: 'green', background: '#e6ffed', padding: '10px', borderRadius: '4px' }}>{mensajeExito}</p>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tucorreo@email.com"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {cargando ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </Contenedor>
  );
}