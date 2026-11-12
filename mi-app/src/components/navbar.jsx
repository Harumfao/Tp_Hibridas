import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '20px', padding: '15px 30px', background: '#222', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
            <Link to="/catalogo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Campos</Link>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Iniciar Sesión</Link>
            <Link to="/registro" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Registro</Link>
        </nav>
    );
}