function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        
        {/* ส่วนที่เพิ่มใหม่: ป้ายกำกับสถานะและความเร่งด่วน */}
        <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
          <span className={`badge status-${request.status}`}>
            {request.status === 'pending' ? 'รอดำเนินการ' :
             request.status === 'in-progress' ? 'กำลังดำเนินการ' : 'เสร็จสิ้น'}
          </span>
          <span className={`badge priority-${request.priority}`}>
            {request.priority === 'urgent' ? 'เร่งด่วน' : 'ปกติ'}
          </span>
        </div>

        <p>{request.location}</p>
        <p>{request.details}</p>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;