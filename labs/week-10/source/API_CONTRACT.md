# API Contract — Campus Service Request API

**เวอร์ชัน:** 2.0.0 · **Base URL:** `http://localhost:3001`
**รูปแบบข้อมูล:** JSON (`Content-Type: application/json`)

> **API Contract คืออะไร** — ข้อตกลงระหว่างคนทำ front-end กับคนทำ back-end
> ว่าจะคุยกันด้วย endpoint อะไร ส่งอะไรไป ได้อะไรกลับ
> มีไว้เพื่อให้สองฝั่ง**ทำงานคู่ขนานกันได้** โดยไม่ต้องรอกัน

---

## โครงสร้างข้อมูล Request

| field | ชนิด | คำอธิบาย | ตัวอย่าง |
|---|---|---|---|
| `id` | string | รหัสคำร้อง · ขึ้นต้นด้วย `REQ-` · เซิร์ฟเวอร์สร้างให้ | `"REQ-001"` |
| `requesterName` | string | ชื่อผู้แจ้ง · อย่างน้อย 2 ตัวอักษร | `"สมชาย ใจดี"` |
| `requestType` | string | ประเภท · 1 ใน 4 ค่าที่กำหนด | `"แจ้งซ่อม"` |
| `location` | string | สถานที่ · ห้ามว่าง | `"ห้องปฏิบัติการ 301"` |
| `details` | string | รายละเอียด · อย่างน้อย 10 ตัวอักษร | `"เครื่องปรับอากาศไม่ทำงาน"` |
| `priority` | string | `"normal"` หรือ `"urgent"` | `"urgent"` |
| `status` | string | `"pending"` · `"in-progress"` · `"completed"` | `"pending"` |

**ค่าที่ยอมรับของ `requestType`** — `แจ้งซ่อม` · `บริการบัญชีผู้ใช้` · `ขอใช้อุปกรณ์` · `อื่น ๆ`

---

## Endpoints

| Method | Endpoint | คำอธิบาย | Request body | สำเร็จ | ผิดพลาด |
|---|---|---|---|---|---|
| `GET` | `/api/requests` | ดูคำร้องทั้งหมด | — | `200` + array | — |
| `GET` | `/api/requests?status=` | กรองตามสถานะ | — | `200` + array | — |
| `GET` | `/api/requests/:id` | ดูคำร้องใบเดียว | — | `200` + object | `404` ไม่พบ |
| `POST` | `/api/requests` | สร้างคำร้องใหม่ | Request (ไม่ต้องมี `id`, `status`) | `201` + object ที่สร้าง | `400` ข้อมูลไม่ถูกต้อง |
| `PUT` | `/api/requests/:id` | เปลี่ยนสถานะ | `{ "status": "..." }` | `200` + object ที่แก้แล้ว | `400` สถานะผิด · `404` ไม่พบ |
| `DELETE` | `/api/requests/:id` | ลบคำร้อง | — | `204` ไม่มี body | `404` ไม่พบ |

---

## ตัวอย่างการเรียกใช้

### GET /api/requests

```http
GET /api/requests HTTP/1.1
Host: localhost:3001
```

```json
[
  {
    "id": "REQ-001",
    "requesterName": "สมชาย ใจดี",
    "requestType": "แจ้งซ่อม",
    "location": "ห้องปฏิบัติการ 301",
    "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
    "priority": "urgent",
    "status": "pending"
  }
]
```

### POST /api/requests

```http
POST /api/requests HTTP/1.1
Content-Type: application/json

{
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal"
}
```

**201 Created**

```json
{
  "id": "REQ-MTYOA3MX-YEX9",
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal",
  "status": "pending"
}
```

**400 Bad Request** — เมื่อข้อมูลไม่ถูกต้อง

```json
{
  "error": "ข้อมูลคำร้องไม่ถูกต้อง",
  "details": [
    "ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร",
    "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร"
  ]
}
```

### PUT /api/requests/:id

```http
PUT /api/requests/REQ-001 HTTP/1.1
Content-Type: application/json

{ "status": "in-progress" }
```

**200 OK** — คืนคำร้องที่อัปเดตแล้ว

### DELETE /api/requests/:id

**204 No Content** — ไม่มี body ส่งกลับ

---

## รูปแบบ Error

ทุก error ตอบเป็น JSON ที่มี field `error` เสมอ

```json
{ "error": "ข้อความที่ผู้ใช้ทั่วไปอ่านเข้าใจ" }
```

กรณี validation จะมี `details` เพิ่มมาเป็น array บอกว่าผิดตรงไหนบ้าง

| Status | เมื่อไหร่ | ฝั่งไหนผิด |
|---|---|---|
| `400` | ข้อมูลที่ส่งมาไม่ถูกต้อง | ผู้ใช้ |
| `404` | ไม่พบทรัพยากรที่ขอ | ผู้ใช้ |
| `500` | โค้ดเซิร์ฟเวอร์ผิดพลาด | เซิร์ฟเวอร์ |

**ตอน production จะไม่ส่ง stack trace กลับไป** — เปิดเผยโครงสร้างภายในให้คนภายนอกเห็นไม่ได้

---

## CORS

API อนุญาตให้เรียกจาก origin ที่กำหนดใน `CORS_ORIGIN` เท่านั้น

```
Access-Control-Allow-Origin: http://localhost:5173
```

**ถ้าเรียกจาก origin อื่น** เบราว์เซอร์จะบล็อกก่อนที่โค้ดจะได้เห็น response — จะเห็น error ใน Console ว่าถูกบล็อกโดย CORS policy

⚠ CORS เป็นกลไกของ **เบราว์เซอร์** เท่านั้น · Postman และ curl ไม่ถูกบล็อก เพราะไม่ใช่เบราว์เซอร์

---

## Environment Variables

### ฝั่ง API (`api/.env`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `PORT` | `3001` | พอร์ตที่ API รับคำขอ |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ที่อนุญาตให้เรียก |
| `NODE_ENV` | `development` | `production` จะเปลี่ยนรูปแบบ log และซ่อน stack trace |

### ฝั่ง Frontend (`frontend/.env.local`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3001` | ที่อยู่ของ API |

**ต้องขึ้นต้นด้วย `VITE_`** ไม่งั้น Vite จะไม่ส่งค่าไปให้โค้ดฝั่งเบราว์เซอร์
และ**ห้าม commit ไฟล์ `.env`** — ใช้ `.env.example` เป็นตัวอย่างแทน

---

## การรันทั้งระบบ

ต้องเปิด **2 terminal** พร้อมกัน

```bash
# Terminal 1 — API
cd api && npm run dev          # http://localhost:3001

# Terminal 2 — Frontend
cd frontend && npm run dev     # http://localhost:5173
```

**ลำดับสำคัญ** — เปิด API ก่อนเสมอ ไม่งั้น frontend จะขึ้นข้อความว่าติดต่อเซิร์ฟเวอร์ไม่ได้

## ผลการทดสอบ SQL Injection

### ① เงื่อนไขที่เป็นจริงเสมอ

**ยิง** `GET /api/requests?status=x' OR '1'='1`
**ผลที่ได้** `[]` (0 รายการ) ✓ ถูกป้องกัน
**เพราะ** ใช้ parameterized query — ค่าถูกตีความเป็นข้อความ ไม่ใช่คำสั่ง

### ② พยายามลบตาราง

**ยิง** `GET /api/requests?status='; DROP TABLE requests; --`
**ผลที่ได้** `[]` จำนวน 0 รายการ และ API ยังทำงานตามปกติ
**เพราะ** คำสั่ง `DROP TABLE requests` ถูกมองเป็นค่า status ไม่ได้ถูกนำไปประมวลผลเป็นคำสั่ง SQL

### ③ ต่อเงื่อนไขเพิ่ม

**ยิง** `GET /api/requests?status=pending' OR status='completed`
**ผลที่ได้** `[]` จำนวน 0 รายการ
**เพราะ** เงื่อนไข `OR status='completed'` ถูกมองเป็นส่วนหนึ่งของข้อความ status ไม่ใช่เงื่อนไข SQL

### ① Data Model

| ตาราง | คอลัมน์ | ชนิด | ข้อกำหนด | เหตุผล |
| :--- | :--- | :--- | :--- | :--- |
| **users** | `id` | INTEGER | PK AUTOINCREMENT | เก็บเป็นตัวเลขเพื่อรันลำดับอัตโนมัติ เป็นคีย์หลักเพื่อใช้อ้างอิงตัวบุคคล |
| | `name` | TEXT | NOT NULL | เก็บเป็นข้อความ จำเป็นต้องมีเสมอเพื่อระบุตัวตน ห้ามเป็นค่าว่าง |
| | `department` | TEXT | NOT NULL | เก็บเป็นข้อความ จำเป็นต้องระบุสังกัดเพื่อใช้ติดต่อ ห้ามเป็นค่าว่าง |
| | `email` | TEXT | NOT NULL UNIQUE | เก็บเป็นข้อความ จำเป็นต้องใช้ติดต่อ ห้ามเป็นค่าว่าง และห้ามซ้ำกับผู้ใช้อื่น |
| **requests** | `id` | TEXT | PRIMARY KEY | เก็บเป็นข้อความเพื่อให้ตั้งรหัสสื่อความหมายได้ (REQ-001) เป็นคีย์หลักอ้างอิงคำร้อง |
| | `requester_id` | INTEGER | NOT NULL (FK) | เก็บเป็นตัวเลขเพื่อเชื่อมกับรหัสผู้ใช้ จำเป็นต้องมีเพื่อระบุว่าใครแจ้ง ห้ามเป็นค่าว่าง |
| | `request_type` | TEXT | NOT NULL, CHECK | เก็บเป็นข้อความ ห้ามเป็นค่าว่าง และจำกัดเฉพาะคำที่กำหนดเพื่อป้องกันสะกดผิด |
| | `location` | TEXT | NOT NULL | เก็บเป็นข้อความ จำเป็นต้องระบุสถานที่เพื่อให้ไปทำงานถูกจุด ห้ามเป็นค่าว่าง |
| | `details` | TEXT | NOT NULL | เก็บเป็นข้อความ จำเป็นต้องอธิบายปัญหาหรืออาการ ห้ามเป็นค่าว่าง |
| | `priority` | TEXT | NOT NULL, DEFAULT, CHECK | เก็บเป็นข้อความ ห้ามเป็นค่าว่าง มีค่าเริ่มต้นเป็น normal และจำกัดเฉพาะคำที่กำหนด |
| | `status` | TEXT | NOT NULL, DEFAULT, CHECK | เก็บเป็นข้อความ ห้ามเป็นค่าว่าง มีค่าเริ่มต้นเป็น pending และจำกัดเฉพาะคำที่กำหนด |
| | `created_at` | TEXT | NOT NULL, DEFAULT | เก็บเป็นข้อความ ห้ามเป็นค่าว่าง และใช้ฟังก์ชันประทับเวลาปัจจุบันให้อัตโนมัติ |

### ② ข้อสังเกตเรื่องรูปแบบ
โครงสร้างในฐานข้อมูลไม่เหมือนรูปแบบที่ API ส่งออก

* ฐานข้อมูลเก็บผู้ร้องเป็น requester_id เพื่อใช้อ้างอิงกับตารางผู้ใช้ แต่ API จะส่งออกเป็น requesterName ตามรูปแบบที่ frontend ต้องการ โดยดึงข้อมูลด้วย JOIN และตั้งชื่อด้วย AS

### ③ พฤติกรรมของ POST ⭐ สำคัญที่สุด

ถ้าส่ง `requesterName` ที่ยังไม่มีในระบบ **จะสร้าง user ใหม่ให้อัตโนมัติ**

**ทำไมข้อนี้สำคัญ** — เป็น**พฤติกรรมที่คนอื่นเดาไม่ได้**จากการดู endpoint อย่างเดียว

ถ้าไม่เขียนไว้ คนที่มาใช้ API ต่อจะไม่รู้ว่าการ POST อาจสร้างผู้ใช้ใหม่ — และอาจสร้างผู้ใช้ขยะโดยไม่ตั้งใจ