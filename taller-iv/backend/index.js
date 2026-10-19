const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint 4: /api/health
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: '¡El API está funcionando correctamente!'
    });
});


app.get('/api/info', (req, res) => {
    res.json({
        status: 'success',
        message: 'El API está conectada y operando al 100%',
        integrantes: [
            {
                nombre: 'David Alejandro Cruz Caballero',
                edad: 21,
                carrera: 'Ingeniería en Computación',
                materiasAprobadas: 32
            }
            // Agrega más integrantes aquí si es un trabajo en grupo
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
