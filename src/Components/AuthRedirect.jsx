import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === "SIGNED_IN" && session) {
        // Store the session in localStorage
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        navigate("MonthlyCalendar");
      } else if (event === "SIGNED_OUT") {
        // Clear the session from localStorage
        localStorage.removeItem('supabase.auth.token');
        navigate("");
      }
    });

    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session);
      
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        navigate("MonthlyCalendar");
      } else {
        // If no session, check localStorage
        const storedSession = localStorage.getItem('supabase.auth.token');
        if (storedSession) {
          try {
            const parsedSession = JSON.parse(storedSession);
            // Verify the session is still valid
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
              localStorage.removeItem('supabase.auth.token');
              navigate("");
            } else {
              navigate("MonthlyCalendar");
            }
          } catch (err) {
            console.error('Error parsing stored session:', err);
            localStorage.removeItem('supabase.auth.token');
            navigate("");
          }
        }
      }
    };
    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
};

export default AuthRedirect;
