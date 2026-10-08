## ครั้งที่ 1 · การแก้ไข Test Suite ของ API ให้ผ่านครบ (401/403 และ Length Error)

**ถามอะไร**
- สาเหตุและวิธีแก้ข้อผิดพลาดของเทสใน `requests.api.test.js` ที่พังเป็น 401 Unauthorized บนเส้นทาง PUT และ DELETE
- สาเหตุที่ `requestValidator.test.js` ฟ้องข้อผิดพลาดเรื่องจำนวน error เกิน (Expected length 1 but got 2 และ length 5 but got 9) รวมถึงการขาดชุดทดสอบ 401 และ 403

**AI ตอบว่าอย่างไร (สรุปสั้น)**
- **401 Unauthorized ใน `requests.api.test.js`:** เกิดจากการเพิ่ม middleware ตรวจสอบสิทธิ์ใน CP51 แต่ไฟล์เทสยังไม่ได้แนบ Token ของ Staff จึงต้อง import `loginAsStaff` มาเรียกใช้ใน `beforeEach` และเติม `.set(auth)` ให้กับทุกคำขอที่เป็น `PUT` และ `DELETE` ทั้ง 6 จุด
- **Error ซ้ำซ้อนใน `requestValidator.js`:** มีบล็อก `if` ตรวจสอบเงื่อนไขแบบเดิมซ้ำกับ Array `errors` ด้านบน จึงต้องตัดบล็อก `if` ส่วนเกินออก ให้เหลือเฉพาะการคืนค่าจาก `errors.filter(Boolean)` รอบเดียว
- **การเพิ่ม Test Case 401 และ 403:** เพิ่มชุดทดสอบใน `api/tests/integration/auth.api.test.js` โดยใช้ `tokenFor('staff', 'wrong-secret')` ทดสอบ 401 และ `tokenFor('requester')` ทดสอบ 403 เพื่อยืนยันการแบ่งสิทธิ์ของระบบ

**ใช้ส่วนไหน / แก้เองตรงไหน**
- นำโค้ดแนวทางไปแก้ใน `api/src/validators/requestValidator.js`, `api/tests/integration/requests.api.test.js`, และ `api/tests/integration/auth.api.test.js` จน `npm test` ผ่านครบ 57/57 ข้อ และตัวตรวจในห้องผ่านครบ 23/23

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 2 · การทำ Challenge: Rate Limiting (429) และ Security Headers

**ถามอะไร**
- การเขียนระบบจำกัดการล็อกอินผิดไม่เกิน 5 ครั้งใน 15 นาที (HTTP 429) ใน `authRoutes.js` พร้อมฟังก์ชัน `resetLoginLimiter()`
- การเพิ่ม Security Headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) ใน `app.js`

**AI ตอบว่าอย่างไร (สรุปสั้น)**
- **Rate Limiter ใน `authRoutes.js`:** ใช้โครงสร้างข้อมูล `Map` เก็บ IP คู่กับจำนวนครั้งที่ผิดและเวลา `resetTime` ตรวจสอบว่าหากยังไม่พ้น 15 นาทีแล้วล็อกอินผิดครบ 5 ครั้ง (`record.count >= 5`) ให้ตัดไฟตอบกลับด้วยสถานะ 429 ทันที พร้อม export ฟังก์ชัน `resetLoginLimiter()` ไปล้างประวัติใน `beforeEach` ของชุดทดสอบ
- **การบันทึกแต้ม:** เมื่อผู้ใช้ล็อกอินไม่สำเร็จ (สถานะ 401) ต้องอัปเดตค่า `record.count++` แล้วบันทึกกลับลงใน `Map` หากสำเร็จให้ลบประวัติของ IP นั้นทิ้ง
- **Security Headers:** สร้าง middleware ใน `api/src/app.js` ก่อนประกาศ routes เพื่อกำหนด Response Headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, และ `Referrer-Policy: no-referrer` ให้กับทุกคำขอ

**ใช้ส่วนไหน / แก้เองตรงไหน**
- นำตรรกะ Rate Limiter ไปใส่ใน route `/login` ของ `authRoutes.js` และเพิ่ม middleware กำหนด Headers ลงใน `app.js` ตามข้อกำหนด Challenge

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 3 · การทำ Challenge: แนบ Token ฝั่ง Frontend และการสุ่ม Secret บน Render

**ถามอะไร**
- วิธีการปรับแต่ง `frontend/src/services/apiClient.js` ให้แนบ Header `Authorization: Bearer <token>` ไปกับทุกคำขอโดยอัตโนมัติ
- วิธีการคอนฟิกไฟล์ `render.yaml` เพื่อให้ Render สร้างค่าสุ่ม `JWT_SECRET` ในโหมด Production

**AI ตอบว่าอย่างไร (สรุปสั้น)**
- **Frontend Token Injection ใน `apiClient.js`:** ย้ายการอ่าน `token` จาก Local Storage เข้าไปไว้ภายในฟังก์ชัน `apiFetch` และสร้าง Object `headers` ที่รวม `Authorization: Bearer ${token}` (หากมี token) เข้ากับ `options.headers` ก่อนส่งเข้าฟังก์ชัน `fetch`
- **Render Secret Configuration ใน `render.yaml`:** ภายใต้หัวข้อ `envVars` ของ web service ให้เพิ่มคีย์ `JWT_SECRET` และกำหนดแอตทริบิวต์เป็น `generateValue: true` เพื่อให้ Render สุ่มสตริงลับที่ปลอดภัยให้โดยอัตโนมัติ ไม่ต้องฮาร์ดโค้ดค่าลงใน Git

**ใช้ส่วนไหน / แก้เองตรงไหน**
- นำโค้ดประกอบ Header ไปอัปเดตฟังก์ชัน `apiFetch` ใน `apiClient.js` และเพิ่มการตั้งค่าตัวแปรสภาพแวดล้อมลงในไฟล์ `render.yaml` จนผ่านเกณฑ์ Challenge ครบถ้วน

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ