import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest }) {
  // TODO LAB4-R11: เพิ่ม empty state เมื่อ requests.length === 0 **
  if (requests.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted)', border: '1px dashed var(--border)', borderRadius: '.75rem', marginTop: '1rem' }}>
        <p>ไม่พบรายการคำร้อง</p>
      </div>
    );
  }

  return (
    <div className="request-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;