import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Store the session in localStorage
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        navigate("/MonthlyCalendar");
      } else if (event === "SIGNED_OUT") {
        // Clear the session from localStorage
        localStorage.removeItem('supabase.auth.token');
        navigate("/");
      }
    });

    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
      }
    };
    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
};

export default AuthRedirect;
