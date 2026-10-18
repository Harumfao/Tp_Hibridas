import { crearApp } from './app.js';
import { config } from './config.js';

const app = crearApp();

app.listen(config.puerto, () => {
  console.log(`Escuchando localhost:${config.puerto} (${config.entorno})`);
});
