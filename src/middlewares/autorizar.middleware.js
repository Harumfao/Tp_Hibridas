export function verificarAutorizacion(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    const apiKeyEsperada = process.env.CLAVE_ADMIN || 'mi_clave_secreta';

    if (!apiKey || apiKey !== apiKeyEsperada) {
        return res.status(401).json({ error: 'No autorizado, credenciales invalidas' });
    }
    next();
};
