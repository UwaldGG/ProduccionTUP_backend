const { config } = require('../config/config');

class AuthService {
  authenticateAdmin(username, password) {
    return username === config.adminUsername && password === config.adminPassword;
  }
}

module.exports = AuthService;
