import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'El API está funcionando correctamente' });
});

app.get('/api/info', (req, res) => {
  res.json({
    message: 'El API está funcionando',
    integrantes: [
      { nombre: 'Melqui Alvarado', edad: 19, carrera: 'Ingeniería en Sistemas', materiasAprobadas: 25 },
      { nombre: 'David Caballero', edad: 21, carrera: 'Ingeniería en Sistemas', materiasAprobadas: 27 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});