import { Router } from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();

// 1. ตั้งค่าการเชื่อมต่อฐานข้อมูล
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE = process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db');
const db = new DatabaseSync(DB_FILE);

// 2. GET /api/users -> รายชื่อผู้ใช้ทั้งหมด
router.get('/', (req, res) => {
  const users = db.prepare('SELECT * FROM users ORDER BY id').all();
  res.status(200).json(users);
});

// 3. GET /api/users/:id/requests -> คำร้องของคนนั้น
router.get('/:id/requests', (req, res) => {
  const userId = req.params.id;
  const SELECT_SHAPE = `
    SELECT r.id,
           u.name          AS requesterName,
           r.request_type  AS requestType,
           r.location,
           r.details,
           r.priority,
           r.status
    FROM requests r
    JOIN users u ON u.id = r.requester_id
    WHERE u.id = ?
    ORDER BY r.id
  `;
  const requests = db.prepare(SELECT_SHAPE).all(userId);
  res.status(200).json(requests);
});

export default router;