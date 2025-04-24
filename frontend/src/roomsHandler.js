const db = require('./database'); // Asegúrate de que el archivo de base de datos esté configurado correctamente

module.exports.getUserRooms = async (req, res) => {
  const { userId, role } = req.params;

  try {
    const [rooms] = await db.query(
      `SELECT cr.*, cru.role 
       FROM chat_rooms cr
       JOIN chat_room_users cru ON cr.id = cru.room_id
       WHERE cru.user_id = ? AND cru.role = ?`, 
      [userId, role]
    );
    res.json(rooms);
  } catch (error) {
    console.error('Error al obtener salas:', error);
    res.status(500).json({ error: 'Error al obtener salas' });
  }
};