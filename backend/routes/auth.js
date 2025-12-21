const router = require('express').Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = 'parking_secret_key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, users) => {
      if (users.length === 0)
        return res.status(401).json({ msg: 'User not found' });

      const user = users[0];
      const valid = await bcrypt.compare(password, user.password_hash);

      if (!valid)
        return res.status(401).json({ msg: 'Invalid password' });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
