# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล: นายธนกร กองใจ
รหัสนักศึกษา: 68543210026-9

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   คำตอบ:App Component (App.jsx) เป็น State Owner ของทั้งคู่
   เพราะ App เป็น Component ตัวหลัก ที่ครอบ Component ย่อยอื่นๆ เอาไว้ทั้งหมด การเก็บ State ไว้ที่ App ทำให้สามารถกระจายข้อมูล ไปยัง Component ย่อยที่จำเป็นต้องใช้ข้อมูลชุดเดียวกันได้

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   คำตอบ:1.ส่ง summary จาก App ลงไปยัง SummaryPanel  
         2.ส่ง requests จาก App ลงไปยัง RequestList  

         1.ส่ง onAddRequest จาก App ลงไปที่ RequestForm เพื่อรับ Object ข้อมูลคำร้องใหม่กลับมาอัปเดต State

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   คำตอบ:data contract เปลี่ยนรูปแบบข้อมูลเป็น Object ที่มีหลายฟิลด์

         validation เพิ่มการเช็คข้อมูลในฟอร์ม (Local State) ต้องกรอกให้ครบถ้วนก่อนทำการ Submit
         
         component responsibility แยกหน้าที่ชัดเจน App คุม State หลักและลอจิก ส่วน Component อื่นๆ ทำหน้าที่แค่รับ Props ไปแสดงผลและส่ง Event กลับ