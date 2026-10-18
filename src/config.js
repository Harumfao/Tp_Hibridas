function obligatorio(nombre) {
  const valor = process.env[nombre];
  if (valor === undefined || valor === '') {
    console.error(`Falta la variable de entorno ${nombre}. Copiá .env.ejemplo a .env`);
    process.exit(1);
  }
  return valor;
}

export const config = {
  puerto: Number(process.env.PUERTO ?? 3000),
  entorno: process.env.NODE_ENV ?? 'development',
  claveAdmin: obligatorio('CLAVE_ADMIN'),
};

export const esProduccion = config.entorno === 'production';
