const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/entry', auth, (req, res) => {
  const { vehicle_number } = req.body;

  db.query(
    'SELECT * FROM parking_slots WHERE is_available = true LIMIT 1',
    (err, slots) => {
      if (slots.length === 0)
        return res.json({ msg: 'No slots available' });

      const slot = slots[0];

      db.query(
        'INSERT INTO parking_records (vehicle_number, slot_number, entry_time) VALUES (?, ?, NOW())',
        [vehicle_number, slot.slot_number]
      );

      db.query(
        'UPDATE parking_slots SET is_available = false WHERE id = ?',
        [slot.id]
      );

      res.json({ msg: 'Vehicle parked', slot: slot.slot_number });
    }
  );
});

router.post('/exit', auth, (req, res) => {
  const { vehicle_number } = req.body;

  db.query(
    'SELECT * FROM parking_records WHERE vehicle_number = ? AND exit_time IS NULL',
    [vehicle_number],
    (err, records) => {
      if (records.length === 0)
        return res.json({ msg: 'Vehicle not found' });

      const record = records[0];

      db.query(
        'UPDATE parking_records SET exit_time = NOW() WHERE id = ?',
        [record.id]
      );

      db.query(
        'UPDATE parking_slots SET is_available = true WHERE slot_number = ?',
        [record.slot_number]
      );

      res.json({ msg: 'Vehicle exited' });
    }
  );
});

router.get('/history', auth, (req, res) => {
  db.query('SELECT * FROM parking_records', (err, rows) => {
    res.json(rows);
  });
});
router.get('/stats', auth, (req, res) => {
  const TOTAL_SLOTS = 50;

  db.query(
    'SELECT COUNT(*) AS occupied FROM parking_slots WHERE is_available = false',
    (err, occupiedResult) => {

      const occupiedSlots = occupiedResult[0].occupied;
      const availableSlots = TOTAL_SLOTS - occupiedSlots;

      db.query(
        `SELECT COUNT(*) AS recordsToday 
         FROM parking_records 
         WHERE DATE(entry_time) = CURDATE()`,
        (err, recordsResult) => {

          res.json({
            totalSlots: TOTAL_SLOTS,
            availableSlots,
            occupiedSlots,
            recordsToday: recordsResult[0].recordsToday
          });
        }
      );
    }
  );
});




module.exports = router;
