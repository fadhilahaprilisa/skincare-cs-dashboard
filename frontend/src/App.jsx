import { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTicketCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <TicketList refreshTrigger={refreshTrigger} />
    </DashboardLayout>
  );
}

export default App;