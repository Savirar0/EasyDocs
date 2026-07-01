import 'react';
import Login from './pages/Login'; // Adjust path if it's under src/components
import { useAuth } from './context/auth';

function App() {
  const { token, role } = useAuth();

  // 🔒 Gatekeeper: If there is no token, completely block the app and show Login
  if (!token) {
    return <Login />;
  }

  // 🔓 Authenticated: Show the dashboard interface once logged in successfully
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🎉 Welcome to EasyDocs Portal</h1>
      <p>You have successfully logged in with the secure role: <strong>{role}</strong></p>
      <p>Backend database synchronization connection is completely active.</p>
    </div>
  );
}

export default App;