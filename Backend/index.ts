import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Interfaz del candidato
// 1. Interfaz actualizada en el Backend
interface Candidato {
    id: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    tipoDocumento: string;
    documento: string;
    rol: 'Interno' | 'Externo';
    celular: string;
    correo: string;
    linkedin: string;
    github: string;
    motivo: string;
}

// "Base de datos" en memoria
let candidatos: Candidato[] = [];

// Endpoint GET: Listar candidatos
app.get('/api/candidatos', (req, res) => {
    res.json(candidatos);
});

// Endpoint POST: Agregar candidato
app.post('/api/candidatos', (req, res) => {
    const nuevoCandidato: Candidato = {
        id: Date.now().toString(),
        ...req.body
    };

    candidatos.push(nuevoCandidato);
    res.status(201).json({ mensaje: 'Candidato agregado', candidato: nuevoCandidato });
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});