require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado para inserir usuários!'))
  .catch(err => console.error('Erro MongoDB:', err));

const usuariosFicticios = [
  { username: 'oficial01', password: 'senha123' },
  { username: 'comandante02', password: 'senha456' },
];

async function criarUsuarios() {
  for (let usuario of usuariosFicticios) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
    await User.create(usuario);
    console.log(`Usuário ${usuario.username} criado!`);
  }
  mongoose.disconnect();
}

criarUsuarios();
