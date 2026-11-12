export function Contenedor({ children, titulo }) {
    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            {titulo && <h2>{titulo}</h2>}
            {children}
        </div>
    );
}