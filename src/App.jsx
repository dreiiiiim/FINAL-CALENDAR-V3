import React, { useEffect } from "react";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import Welcomepage from "./Components/Welcomepage";
import AuthRedirect from "./Components/AuthRedirect";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./Components/client";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/MonthlyCalendar");
      }
    };
    checkSession();
  }, [navigate]);

  return (
   import React, { useEffect } from "react";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import Welcomepage from "./Components/Welcomepage";
import AuthRedirect from "./Components/AuthRedirect";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./Components/client";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/MonthlyCalendar");
      }
    };
    checkSession();
  }, [navigate]);

  return (
  <Router>
      <div className='h-screen w-screen'>
        <Routes>
          <Route path='/' element={<Welcomepage />} />
          <Route path='/MonthlyCalendar' element={<MonthlyCalendar />} />
          <Route path='*' element={<AuthRedirect />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

  );
};

export default App;
