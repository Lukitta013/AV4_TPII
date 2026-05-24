import { useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import './Header.css'

const TITLES = {
  '/':            { title: 'Dashboard',    sub: 'Visão geral do sistema' },
  '/clientes':    { title: 'Clientes',     sub: 'Gestão de hóspedes e dependentes' },
  '/acomodacoes': { title: 'Acomodações',  sub: 'Tipos de quartos disponíveis' },
  '/hospedagens': { title: 'Hospedagens',  sub: 'Check-in e check-out de hóspedes' },
}

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const info = TITLES[pathname] || { title: 'Atlantis', sub: '' }

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Menu">
          <Menu size={20} />
        </button>
        <div>
          <h2 className="header-title font-display">{info.title}</h2>
          <p className="header-sub">{info.sub}</p>
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" aria-label="Notificações">
          <Bell size={18} />
          <span className="header-notif-dot" />
        </button>
        <div className="header-divider" />
        <div className="header-date">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'short', day: '2-digit', month: 'short'
          })}
        </div>
      </div>
    </header>
  )
}
