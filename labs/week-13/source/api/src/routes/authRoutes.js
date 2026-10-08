import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const loginAttempts = new Map();

export function resetLoginLimiter() {
  loginAttempts.clear();
}

router.post('/login', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 นาที

  const record = loginAttempts.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  // ถ้าผิดครบ 5 ครั้งแล้ว ให้ตอบ 429 ทันที
  if (record.count >= 5) {
    return res.status(429).json({ error: 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอสักครู่' });
  }
  
  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    record.count++;
    loginAttempts.set(ip, record);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  loginAttempts.delete(ip);
  res.status(200).json(result);
});

export default router;
