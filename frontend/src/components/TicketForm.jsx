import { useState } from 'react';

const TicketForm = ({ onTicketCreated }) => {
  const [customerName, setCustomerName] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          complaint_text: complaintText,
        }),
      });
      if (response.ok) {
        setCustomerName('');
        setComplaintText('');
        if (onTicketCreated) onTicketCreated();
        alert('✅ Tiket berhasil dikirim ke AI!');
      } else {
        alert('❌ Gagal mengirim tiket.');
      }
    } catch (error) {
      alert('❌ Error koneksi ke server. Pastikan FastAPI berjalan!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-light">
      <h2 className="text-xl font-semibold text-text-primary mb-4">📝 Input Keluhan Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary">Nama Customer</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Misal: Budi Santoso"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-medium focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary">Keluhan</label>
          <textarea
            rows="3"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            placeholder="Ceritakan keluhan skincare-nya..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-medium focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium text-purple transition ${
            isLoading
              ? ' bg-blue-400 cursor-not-allowed'
              : 'bg-blue-medium hover:bg-blue-600'
          }`}
        >
          {isLoading ? '⏳ Mengirim...' : '🚀 Kirim ke AI'}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;