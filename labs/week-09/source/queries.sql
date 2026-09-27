-- ═══════════════════════════════════════════════════════════
-- queries.sql — คำสั่งค้นหาตอบโจทย์
-- 🏠 TODO W09-QUERY (CP22) · เขียนอย่างน้อย 8 ข้อ
--
-- เขียนคำสั่งจริงที่รันได้ ไม่ใช่เขียนบรรยาย
-- ทุกข้อต้องทดสอบแล้วว่าได้ผลลัพธ์ถูกต้อง
-- ═══════════════════════════════════════════════════════════

-- ① คำร้องทั้งหมด เรียงตามรหัส
SELECT * FROM requests ORDER BY id;


-- ② คำร้องที่ยังไม่ได้ดำเนินการ (status = 'pending')
SELECT id, location, details FROM requests
WHERE status = 'pending'
ORDER BY id;

-- ③ คำร้องเร่งด่วนที่ยังไม่เสร็จ — ใช้เงื่อนไข 2 ข้อพร้อมกัน
SELECT id, location, details FROM requests
WHERE priority = 'urgent' AND status != 'completed'
ORDER BY id;

-- ④ ค้นคำร้องจากคำบางส่วนในรายละเอียด  (คำใบ้: LIKE)
SELECT * FROM requests
WHERE details LIKE '%ห้อง%';


-- ⑤ คำร้องพร้อมชื่อผู้แจ้ง  ← ต้องใช้ JOIN เพราะชื่ออยู่คนละตาราง
SELECT requests.id, requests.request_type, requests.details, users.name 
FROM requests 
JOIN users ON requests.requester_id = users.id;


-- ⑥ คำร้องเฉพาะของภาควิชาหนึ่ง  (JOIN + WHERE)
SELECT requests.id, users.name, users.department, requests.details 
FROM requests 
JOIN users ON requests.requester_id = users.id 
WHERE users.department = 'วิศวกรรมซอฟต์แวร์';

-- ⑦ รายชื่อผู้แจ้งที่ไม่ซ้ำกัน  (คำใบ้: DISTINCT)
SELECT DISTINCT users.name 
FROM requests 
JOIN users ON requests.requester_id = users.id;

-- ⑧ คำร้อง 3 รายการล่าสุด  (คำใบ้: ORDER BY + LIMIT)
SELECT * FROM requests 
ORDER BY created_at DESC 
LIMIT 3;

INSERT INTO requests (id, requester_id, request_type, location, details, priority, status) VALUES
  ('REQ-005', 2, 'แจ้งซ่อม', 'ห้องสมุด ชั้น 2', 'ขอเพิ่มปลั๊กไฟบริเวณโต๊ะอ่านหนังสือ', 'normal', 'pending'),
  ('REQ-006', 4, 'ขอใช้อุปกรณ์', 'ห้องประชุม 3', 'ขอยืมไมโครโฟน', 'urgent', 'in-progress'),
  ('REQ-007', 3, 'บริการบัญชีผู้ใช้', 'อาคารวิศวกรรม', 'ลืมรหัสผ่านเข้าสู่ระบบ', 'normal', 'completed');

-- ⭐ Challenge ─────────────────────────────────────────────
-- ⑨ นับจำนวนคำร้องแยกตามสถานะ  (GROUP BY + COUNT)
SELECT status, COUNT(*) AS total
FROM requests
GROUP BY status
ORDER BY total DESC;

-- ⑩ ใครแจ้งคำร้องมากที่สุด  (คำใบ้: LEFT JOIN เพื่อให้คนที่ยังไม่เคยแจ้งติดมาด้วย)
SELECT u.name, u.department, COUNT(r.id) AS total
FROM users u
LEFT JOIN requests r ON r.requester_id = u.id
GROUP BY u.id
ORDER BY total DESC, u.name;

-- ⑪ สร้าง INDEX ให้การค้นด้วย status เร็วขึ้น
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_requester ON requests(requester_id);