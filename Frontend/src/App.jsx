import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/auth';

function App() {
  const { role, companyId, logoutUser } = useAuth();

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh' }}>
      {/* 🧭 Global Top Navigation / Header */}
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
        <h2>EasyDocs Portal</h2>
        <div>
          <span>Role: <strong>{role}</strong> | Company: <strong>{companyId}</strong></span>
          <button onClick={logoutUser} style={{ marginLeft: '15px' }}>Logout</button>
        </div>
      </header>

      {/* 📄 Dynamic Page Content Renders Here */}
      <main style={{ padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
