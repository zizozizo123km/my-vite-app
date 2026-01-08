import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define the key used for storing the authentication token in local storage
const AUTH_TOKEN_KEY = 'authToken';

// Define the initial state structure
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Crucial for checking session status on initial load
};

// 1. Create the Context
const AuthContext = createContext(initialState);

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  // --- Session Initialization Effect ---
  useEffect(() => {
    /**
     * Checks localStorage for a token and simulates session validation.
     * In a production environment, this would involve an API call (e.g., /api/me)
     * using the stored token to verify validity and fetch user data.
     */
    const checkSession = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (token) {
        try {
          // --- START: Production Simulation ---
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 100));

          // Assume token is valid and we fetch user data
          const simulatedUser = {
            id: 'user-123',
            name: 'Architect User',
            email: 'architect@example.com',
            role: 'customer',
          };

          setState({
            user: simulatedUser,
            isAuthenticated: true,
            loading: false,
          });
          // --- END: Production Simulation ---

        } catch (error) {
          // If token is invalid or expired
          console.error("Session validation failed:", error);
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setState(prevState => ({ ...prevState, loading: false }));
        }
      } else {
        // No token found
        setState(prevState => ({ ...prevState, loading: false }));
      }
    };

    checkSession();
  }, []);

  // --- Authentication Actions ---

  const login = async (credentials) => {
    setState(prevState => ({ ...prevState, loading: true }));

    // --- START: Production Simulation (Replace with actual Axios/Fetch call) ---
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay

    // Successful login response simulation
    const token = `fake-jwt-${Date.now()}`;
    const loggedInUser = {
      id: 'user-123',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: 'customer',
    };

    localStorage.setItem(AUTH_TOKEN_KEY, token);

    setState({
      user: loggedInUser,
      isAuthenticated: true,
      loading: false,
    });
    // --- END: Production Simulation ---

    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  // Memoize the context value to prevent unnecessary re-renders in consuming components
  const contextValue = useMemo(() => ({
    ...state,
    login,
    logout,
  }), [state]);

  // If loading is true, we might render a global loading spinner here,
  // or simply let the consumer handle the `loading` state.
  if (state.loading) {
    // Optional: Render a minimal loading screen while checking session
    // return <div className="flex justify-center items-center h-screen">Loading Session...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook for easy consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}