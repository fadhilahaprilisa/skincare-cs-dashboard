import { useEffect, useState } from 'react';

const TicketList = ({ refreshTrigger }) => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Gagal fetch tiket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [refreshTrigger]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-blue-light">
        <p className="text-center text-text-primary">⏳ Memuat riwayat tiket...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-blue-light">
      <h2 className="text-xl font-semibold text-text-primary mb-4">📋 Riwayat Tiket</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-text-primary">Belum ada tiket. Yuk buat yang pertama!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-light">
            <thead className="bg-blue-light/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Keluhan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-light">
              {tickets.map((ticket) => (
                <>
                  <tr key={ticket.id} className="hover:bg-blue-light/10 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{ticket.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{ticket.customer_name}</td>
                    <td className="px-6 py-4 text-sm text-text-primary max-w-xs truncate">{ticket.complaint_text}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {ticket.ai_draft_reply ? (
                        <button
                          onClick={() => toggleExpand(ticket.id)}
                          className="text-purple-medium hover:text-purple-dark font-medium underline"
                        >
                          {expandedId === ticket.id ? 'Sembunyikan' : 'Lihat Balasan'}
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">Tidak ada</span>
                      )}
                    </td>
                  </tr>
                  {expandedId === ticket.id && ticket.ai_draft_reply && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 bg-blue-light/10 border-t border-blue-light">
                        <div className="text-sm text-text-primary">
                          <strong className="block mb-2 text-purple-dark">💬 Balasan AI:</strong>
                          <p className="whitespace-pre-wrap leading-relaxed">{ticket.ai_draft_reply}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketList;