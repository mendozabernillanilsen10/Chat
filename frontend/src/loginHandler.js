const db = require('./database'); // Asegúrate de que el archivo de base de datos esté configurado correctamente

module.exports = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [usuario, contrasena]);
    if (user.length > 0) {
      res.json({ success: true, userId: user[0].id, username: user[0].username });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en login' });
  }
};