import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, BedDouble, Hotel,
  Waves, LogOut, ChevronRight, X
} from 'lucide-react'
import './Sidebar.css'

const NAV_ITEMS = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/clientes',     icon: Users,           label: 'Clientes'     },
  { to: '/acomodacoes',  icon: BedDouble,       label: 'Acomodações'  },
  { to: '/hospedagens',  icon: Hotel,           label: 'Hospedagens'  },
]

export default function Sidebar({ usuario, onLogout, open, onClose }) {
  return (
    <>
      {/* Overlay (mobile) */}
      {open && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Waves size={20} />
          </div>
          <div>
            <span className="sidebar-brand-name">Atlantis</span>
            <span className="sidebar-brand-sub">Gestão Premium</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Menu Principal</span>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
              }
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
              <ChevronRight size={14} className="sidebar-item-arrow" />
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {usuario.nome.charAt(0)}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{usuario.nome}</span>
              <span className="sidebar-user-role">{usuario.cargo}</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={onLogout} title="Sair">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  )
}
