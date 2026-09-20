**ชื่อ–รหัส:** ธนกร กองใจ 68543210026-9 **วันที่ทดสอบ:** 20 ก.ย. 2569

> บันทึก **ผลจริง** ที่ได้จากการรันชุดทดสอบ Automated Test (`api/tests/api.test.js` ผ่านคำสั่ง `npm test`)

---

## ผลการทดสอบ Automated Test (CP16: 6 เคส)

| # | Method | Path / หัวข้อการทดสอบ | สิ่งที่ส่งไป (Request Payload / Header) | Status ที่ควรได้ | Status ที่ได้จริง | ผลการทดสอบ | ผ่าน |
|---|---|---|---|---|---|---|:---:|
| 1 | `GET` | `/api/requests` | — | 200 | 200 | คืน Array รายการคำร้องทั้งหมด | ✓ |
| 2 | `GET` | `/api/requests/REQ-001` | — | 200 | 200 | คืน Object คำร้อง `REQ-001` ถูกต้อง | ✓ |
| 3 | `GET` | `/api/requests/REQ-999` | — | 404 | 404 | คืน `{"error": "ไม่พบคำร้องรหัส REQ-999"}` | ✓ |
| 4 | `POST` | `/api/requests` | `{ requesterName: "ทดสอบ ระบบ", requestType: "แจ้งซ่อม", location: "C3-401", details: "รายละเอียดยาวพอสมควรจริง", priority: "normal" }` | 201 | 201 | สร้างสำเร็จ ได้ ID `REQ-...` และ `status: "pending"` โดยชื่อ `requesterName` ตรงตามที่ส่ง | ✓ |
| 5 | `POST` | `/api/requests` | `{ requesterName: "-", details: "-" }` (ข้อมูลไม่ครบถ้วน/ไม่ผ่านเกณฑ์) | 400 | 400 | คืน error validation พร้อม array details | ✓ |
| 6 | `GET` | `/api/requests` (CORS) | Header `Origin: http://localhost:5173` | 200 | 200 | คืน `Access-Control-Allow-Origin: http://localhost:5173` | ✓ |

---

## ผลการรัน `npm test` จริงใน Terminal

```text
thanakorn@DESKTOP-5D7NFAA:~/workspace/engse203/engse203-student-labs-68543210026-9/labs/week-07/source/api$ npm test

> engse203-week06-campus-api@2.0.0 test
> node --test "tests/*.test.js"

GET /api/requests 200 2.484 ms - 1030
▶ GET /api/requests
  ✔ คืนรายการทั้งหมด พร้อม status 200 และเป็น array (17.697997ms)
✔ GET /api/requests (24.860796ms)
GET /api/requests/REQ-001 200 0.700 ms - 321
▶ GET /api/requests/:id (กรณีพบข้อมูล)
  ✔ ค้นหาคำร้องเจอ คืน status 200 (4.4241ms)
✔ GET /api/requests/:id (กรณีพบข้อมูล) (4.5907ms)
GET /api/requests/REQ-999 404 0.379 ms - 65
▶ GET /api/requests/:id (กรณีไม่พบข้อมูล)
  ✔ ค้นหาคำร้องไม่เจอ คืน status 404 (4.5601ms)
✔ GET /api/requests/:id (กรณีไม่พบข้อมูล) (4.949599ms)
POST /api/requests 201 10.817 ms - 258
▶ POST /api/requests (ข้อมูลถูกต้อง)
  ✔ สร้างคำร้องสำเร็จ คืน 201 และ status เป็น pending (17.894197ms)
✔ POST /api/requests (ข้อมูลถูกต้อง) (18.276597ms)
POST /api/requests 400 0.618 ms - 198
▶ POST /api/requests (ข้อมูลไม่ครบ)
  ✔ ส่งข้อมูลไม่ครบ คืน status 400 (4.186599ms)
✔ POST /api/requests (ข้อมูลไม่ครบ) (4.459499ms)
GET /api/requests 200 0.375 ms - 1289
▶ CORS Header
  ✔ ตอบ origin ที่อนุญาตกลับมาใน header (3.453599ms)
✔ CORS Header (3.610299ms)
ℹ tests 6
ℹ suites 6
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 361.270446
```

---