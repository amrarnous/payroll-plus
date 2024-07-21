import PaymentsHistory from '../components/payments-history/PaymentsHistory';

function PaymentsHistoryPage() {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h1 className='text-primary text-2xl font-bold '>Payments History</h1>
      </div>
      <PaymentsHistory />
    </div>
  );
}

export default PaymentsHistoryPage;