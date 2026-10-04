# Campus Service — Full-Stack

ระบบจัดการคำร้องของมหาวิทยาลัย (Campus Service Request)

## ภาพรวม

* **ระบบทำอะไร:** ระบบสำหรับบันทึกและจัดการคำร้องต่างๆ ภายในมหาวิทยาลัย

* **เทคโนโลยีที่ใช้:** React (Frontend), Express (API/Backend) และ SQLite (Database)

## สถาปัตยกรรม 3 ชั้น

```
         HTTP            SQL
[ React ] ---> [ Express ] ---> [ SQLite ]
          JSON           rows
```

| ชั้น | หน้าที่ | โฟลเดอร์ | 
| ----- | ----- | ----- | 
| Frontend | หน้าจอผู้ใช้ | `frontend/` | 
| API | route · controller · service | `api/src/` | 
| Database | เก็บข้อมูล | `api/data/` | 

## วิธีรัน (dev)

ต้องเปิด 2 Terminal เพื่อแยกการทำงานของ Frontend และ API

**Terminal 1 (API):**

```
cd api
npm run dev
```

**Terminal 2 (Frontend):**

```
cd frontend
npm run dev
```

## วิธีรัน (production)

จำลองการรันระบบเพื่อใช้งานจริง:

```
npm run build
NODE_ENV=production npm start
```

## Environment Variables

ตารางตัวแปรที่สามารถตั้งค่าได้ (เช่น ในไฟล์ `.env`):

| ตัวแปร | หน้าที่ | ค่าเริ่มต้น | 
| ----- | ----- | ----- | 
| `PORT` | พอร์ตสำหรับเปิดใช้งาน API | `3001` | 
| `DB_FILE` | ระบุตำแหน่งไฟล์ฐานข้อมูล (Database) | `data/campus.db` | 
| `SCHEMA_FILE` | ระบุตำแหน่งไฟล์โครงสร้างตาราง (SQL) | `data/schema.sql` | 
| `NODE_ENV` | สลับโหมดการทำงาน (เช่น `development` หรือ `production`) มีผลกับการแสดงผล Log ของระบบ | `development` | 
| `CORS_ORIGIN` | กำหนด URL ของ Frontend ที่อนุญาตให้เข้าถึง API ได้ (ป้องกันปัญหา CORS) | `http://localhost:5173` |

## การตัดสินใจออกแบบ

* **ทำไมแยก 3 ชั้น:** เพื่อให้โครงสร้างโค้ดเป็นระเบียบและดูแลรักษาง่าย แยกส่วนแสดงผล (React) ออกจากส่วนจัดการข้อมูล (Express/API) ทำให้สามารถแก้ไขหรือสเกลระบบแต่ละส่วนแยกกันได้

* **ทำไมเลือก SQLite:** เพราะตั้งค่าง่าย ไม่ต้องติดตั้งเซิร์ฟเวอร์ฐานข้อมูลแยกต่างหาก ไฟล์ข้อมูลรวมอยู่ในโปรเจกต์เลย เหมาะสำหรับการเริ่มต้นและระบบขนาดเล็ก