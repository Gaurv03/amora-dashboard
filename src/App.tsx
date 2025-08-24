import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/layout/layout'
import LoginPage from './pages/login/page'
import { Unauthorized } from './pages/Unauthorized'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Users } from './pages/users/page'
import UserDetailsPage from './pages/users/UserDetailsPage'
import EditUserPage from './pages/users/EditUserPage'
import { Toaster } from 'sonner'
function App() {

  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserDetailsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <EditUserPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
