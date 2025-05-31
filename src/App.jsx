import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './Components/client';
import Welcomepage from './Components/Welcomepage';
import MonthlyCalendar from './Components/MonthlyCalendar';
import AuthRedirect from './Components/AuthRedirect';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/MonthlyCalendar');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/MonthlyCalendar" element={<MonthlyCalendar />} />
      </Routes>
      <AuthRedirect />
    </div>
  );
}

export default App;
