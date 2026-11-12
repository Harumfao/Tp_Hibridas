import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token de sesión.' });
    }

    // Extraemos el token quitando la palabra "Bearer " si la incluye
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos el payload (id y rol) en req.user
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}
export function verificarAdmin(req, res, next) {
    // Si por alguna razón req.user no existe
    if (!req.user) {
        return res.status(401).json({ error: 'No autorizado.' });
    }

    // Si el rol NO es admin, rechazamos con 403 Forbidden
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso prohibido. Se requiere rol de administrador.' });
    }

    next(); // Si es admin, lo dejamos avanzar
}