import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ToastContainer from './ui/ToastContainer'
import './Layout.css'

export default function Layout({ usuario, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="layout">
      <Sidebar
        usuario={usuario}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="layout-main">
        <Header onMenuClick={() => setSidebarOpen(v => !v)} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
