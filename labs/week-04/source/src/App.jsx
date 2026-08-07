import { useState } from 'react';
import { initialRequests } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestForm from './components/RequestForm.jsx';
import RequestList from './components/RequestList.jsx';

function App() {
  // TODO LAB4-R04: เปลี่ยน requests/statusFilter เป็น state ***
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO LAB4-R04: คำนวณ summary เป็น derived data ***
  const summary = {
    total: requests.length,
    pending: requests.filter((req) => req.status === 'pending').length,
    inProgress: requests.filter((req) => req.status === 'in-progress').length,
    completed: requests.filter((req) => req.status === 'completed').length,
  };

  // TODO LAB4-R08: คำนวณ filteredRequests จาก requests + statusFilter
  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter((req) => req.status === statusFilter);

  function handleAddRequest(requestData) {
    // สร้าง Object คำร้องใหม่
    const newRequest = {
      id: `REQ-${Date.now()}`, // สร้าง ID จำลองจาก Timestamp ปัจจุบัน
      status: 'pending', // กำหนดสถานะเริ่มต้นเป็น 'รอดำเนินการ'
      ...requestData // นำข้อมูลจากฟอร์ม (ชื่อ, ประเภท, สถานที่ ฯลฯ) มาใส่
    };
    
    // อัปเดต State โดยเอาคำร้องใหม่ไว้บนสุด แล้วตามด้วยรายการเดิม
    setRequests([newRequest, ...requests]); 
  }

  // ฟังก์ชันสำหรับเพิ่มคำร้องใหม่ (LAB4-R07)
  function handleAddRequest(newRequestData) {
    const newRequest = {
      ...newRequestData,
      id: `REQ-${Date.now()}`, // สร้าง ID ใหม่โดยใช้ Timestamp
      status: 'pending',       // กำหนดสถานะเริ่มต้นเป็น รอดำเนินการ
    };
    
    // อัปเดต State แบบ Immutable โดยเอาคำร้องใหม่ไว้บนสุดของ Array
    setRequests([newRequest, ...requests]);
  }

  // ฟังก์ชันสำหรับลบคำร้อง (LAB4-R10)
  function handleDeleteRequest(id) {
    // ใช้ filter() เพื่อกรองเอาการ์ดที่ ID ตรงกันออกจาก State
    setRequests(requests.filter((request) => request.id !== id));
  }

  function handleDeleteRequest(requestId) {
    setRequests(requests.filter((req) => req.id !== requestId));
  }
  
  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;