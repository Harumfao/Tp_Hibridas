export function registroMiddleware(req, res, next) {
    const tiempoInicio = Date.now();
    res.on('finish', () => {
        const duracion = Date.now() - tiempoInicio;
        const metodo = req.method;
        const url = req.originalUrl;
        const estado = res.statusCode;
        console.log(`[${new Date().toISOString()}] ${metodo} ${url} - Estado: ${estado} - Duracion: ${duracion}ms`);
    });
    next();      
}      

