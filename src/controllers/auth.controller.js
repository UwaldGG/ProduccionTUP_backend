const AuthService = require('../services/auth.services');
const service = new AuthService();

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (await service.authenticateAdmin(username, password)) {
    res.json({ message: 'Autenticado', isAdmin: true });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};

module.exports = adminLogin;

  