require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro no MongoDB:', err));

// Rota Inicial
app.get('/', (req, res) => {
  res.send('Backend do SIGACrim-RS funcionando!');
});

// Porta do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Importando rota de autenticação
const authRoutes = require('./routes/auth');

// Usar rotas
app.use('/api/auth', authRoutes);

