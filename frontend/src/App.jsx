import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ClientesPage from './components/clientes/ClientesPage'
import AcomodacoesPage from './components/acomodacoes/AcomodacoesPage'
import HospedagensPage from './components/hospedagens/HospedagensPage'

export default function App() {
  const [usuario, setUsuario] = useState(null)

  const handleLogin  = (u) => setUsuario(u)
  const handleLogout = () => setUsuario(null)

  if (!usuario) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout usuario={usuario} onLogout={handleLogout} />}>
          <Route path="/"             element={<Dashboard />} />
          <Route path="/clientes"     element={<ClientesPage />} />
          <Route path="/acomodacoes"  element={<AcomodacoesPage />} />
          <Route path="/hospedagens"  element={<HospedagensPage />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
