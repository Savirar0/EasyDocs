import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { useAuth } from './context/auth'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CompanyRegistration from './pages/CompanyRegistration'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

const router = createBrowserRouter([
  {index: true, element:<Login />},
  {path: "/login", element: <Login/>},
  {path: "/registration", element: <CompanyRegistration />},
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <App />,
        children:[
          {path: "/dashboard", element: <Dashboard />},
        ]
      }
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
