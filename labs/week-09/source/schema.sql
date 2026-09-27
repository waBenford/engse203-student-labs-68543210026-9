-- ═══════════════════════════════════════════════════════════
-- Campus Service Request — โครงสร้างฐานข้อมูล
-- ENGSE203 สัปดาห์ที่ 9 · หน่วยที่ 4
--
-- 🏠 TODO W09-SCHEMA (CP23)
-- ไฟล์นี้ต้องรันแล้วสร้างฐานข้อมูลได้ครบทั้งหมดในครั้งเดียว
-- และต้อง "รันซ้ำได้" โดยไม่ error
-- ═══════════════════════════════════════════════════════════

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  department  TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE
);

CREATE TABLE requests (
  id            TEXT PRIMARY KEY,
  requester_id  INTEGER NOT NULL,
  request_type  TEXT NOT NULL
                CHECK (request_type IN ('แจ้งซ่อม','บริการบัญชีผู้ใช้','ขอใช้อุปกรณ์','อื่น ๆ')),
  location      TEXT NOT NULL,
  details       TEXT NOT NULL,
  priority      TEXT NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('normal','urgent')),
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','in-progress','completed')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now','localtime')),

  FOREIGN KEY (requester_id) REFERENCES users(id)
);

INSERT INTO users (name, department, email) VALUES
  ('สมชาย ใจดี', 'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th'),
  ('สุภาวดี รักเรียน', 'วิศวกรรมซอฟต์แวร์', 'supawadee@rmutl.ac.th'),
  ('ธนกฤต ตั้งใจ', 'วิศวกรรมไฟฟ้า', 'thanakrit@rmutl.ac.th'),
  ('ปรียา ขยันยิ่ง', 'สำนักวิทยบริการ', 'preeya@rmutl.ac.th'),
  ('พี ซอยตัน', 'วิศวกรรมไฟฟ้า', 'pee@rmutl.ac.th'),
  ('ติก วัดเจด', 'วิศวกรรมซอฟต์แวร์', 'tick@rmutl.ac.th'),
  ('ฟุก จอก', 'วิศวกรรมซอฟต์แวร์', 'fluce@rmutl.ac.th');

  INSERT INTO requests (id, requester_id, request_type, location, details, priority, status) VALUES
  ('REQ-001', 1, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 301', 'เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า', 'urgent', 'pending'),
  ('REQ-002', 2, 'บริการบัญชีผู้ใช้', 'อาคารวิศวกรรม',      'เข้าสู่ระบบห้องปฏิบัติการไม่ได้', 'normal', 'in-progress'),
  ('REQ-003', 3, 'ขอใช้อุปกรณ์', 'ห้องประชุม 2',        'ขอยืมโปรเจกเตอร์', 'normal', 'completed'),
  ('REQ-004', 4, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 302', 'คอมพิวเตอร์เครื่องที่ 5 เปิดไม่ติด', 'urgent', 'pending'),
  ('REQ-005', 5, 'แจ้งซ่อม', 'ห้องสมุด ชั้น 2',     'ขอเพิ่มปลั๊กไฟบริเวณโต๊ะอ่านหนังสือ', 'normal', 'pending'),
  ('REQ-006', 6, 'ขอใช้อุปกรณ์', 'ห้องประชุม 3',        'ขอยืมไมโครโฟน', 'urgent', 'in-progress'),
  ('REQ-007', 7, 'บริการบัญชีผู้ใช้', 'อาคารวิศวกรรม',      'ลืมรหัสผ่านเข้าสู่ระบบ', 'normal', 'completed'),
  ('REQ-008', 1, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 301', 'เครื่องพิมพ์ไม่ทำงาน', 'normal', 'pending');