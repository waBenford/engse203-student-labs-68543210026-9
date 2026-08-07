import { useState } from 'react';

function RequestForm({ onAddRequest }) {
  // 1. สร้าง State เก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    requesterName: '',
    requestType: '',
    location: '',
    details: '',
    priority: 'normal'
  });
  
  // 2. สร้าง State เก็บข้อความ Error และ Status
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  // 3. ฟังก์ชันอัปเดต State เมื่อพิมพ์ข้อมูล
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
    // ลบ Error ทิ้งเมื่อผู้ใช้เริ่มพิมพ์แก้ไข
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  // 4. ฟังก์ชันตรวจสอบและส่งข้อมูลเมื่อกดปุ่ม
  function handleSubmit(event) {
    event.preventDefault();

    // TODO LAB4-R05–R07: validate controlled state แล้วเรียก onAddRequest **
    
    // Validate ข้อมูลตามเงื่อนไข
    const newErrors = {};
    const trimmedName = formData.requesterName.trim();
    const trimmedLocation = formData.location.trim();
    const trimmedDetails = formData.details.trim();

    // 1. ชื่อผู้แจ้ง: อย่างน้อย 2 ตัวอักษร
    if (trimmedName.length < 2) {
      newErrors.requesterName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    }
    
    // 2. ประเภทคำร้อง: ต้องเลือก
    if (!formData.requestType) {
      newErrors.requestType = 'กรุณาเลือกประเภทคำร้อง';
    }
    
    // 3. สถานที่: ห้ามว่าง
    if (!trimmedLocation) {
      newErrors.location = 'กรุณากรอกสถานที่';
    }
    
    // 4. รายละเอียด: อย่างน้อย 10 ตัวอักษร
    if (trimmedDetails.length < 10) {
      newErrors.details = 'กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร';
    }

    // ถ้ามี Error ให้เซ็ตค่าแล้วหยุดทำงาน
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('กรุณาตรวจสอบข้อมูลให้ถูกต้อง');
      return;
    }

    // ถ้าผ่าน ให้ส่งข้อมูลไป App.jsx (ดึงช่องว่างหัวท้ายออกก่อนส่ง)
    onAddRequest({
      ...formData,
      requesterName: trimmedName,
      location: trimmedLocation,
      details: trimmedDetails
    });
    
    // เคลียร์ฟอร์มเมื่อสำเร็จ
    setFormData({
      requesterName: '', requestType: '', location: '', details: '', priority: 'normal'
    });
    setErrors({});
    setStatus('เพิ่มคำร้องสำเร็จ!');
    setTimeout(() => setStatus(''), 3000);
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input 
            id="requesterName" name="requesterName" 
            value={formData.requesterName} onChange={handleChange} 
            aria-invalid={!!errors.requesterName} 
          />
          <small className="error" id="requesterName-error">{errors.requesterName}</small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select 
            id="requestType" name="requestType" 
            value={formData.requestType} onChange={handleChange}
            aria-invalid={!!errors.requestType}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">{errors.requestType}</small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input 
            id="location" name="location" 
            value={formData.location} onChange={handleChange} 
            aria-invalid={!!errors.location}
          />
          <small className="error" id="location-error">{errors.location}</small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea 
            id="details" name="details" rows="4" 
            value={formData.details} onChange={handleChange}
            aria-invalid={!!errors.details}
          ></textarea>
          <small className="error" id="details-error">{errors.details}</small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input 
              type="radio" name="priority" value="normal" 
              checked={formData.priority === 'normal'} onChange={handleChange} 
            /> ปกติ
          </label>
          <label>
            <input 
              type="radio" name="priority" value="urgent" 
              checked={formData.priority === 'urgent'} onChange={handleChange} 
            /> เร่งด่วน
          </label>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">{status}</p>
      </form>
    </section>
  );
}

export default RequestForm;