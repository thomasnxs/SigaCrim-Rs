const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' });

  const senhaCorreta = await bcrypt.compare(password, user.password);
  if (!senhaCorreta) return res.status(400).json({ msg: 'Senha incorreta.' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.json({ token, user: { username: user.username, role: user.role } });
});

module.exports = router;
