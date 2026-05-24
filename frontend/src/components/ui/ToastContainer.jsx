import { CheckCircle, XCircle, Info } from 'lucide-react'
import { useApp } from '../../context/AppContext'
const ICONS = {
  success: <CheckCircle size={18} color="#2ECC71" />,
  error:   <XCircle   size={18} color="#E74C3C" />,
  info:    <Info      size={18} color="var(--gold)" />,
}

export default function ToastContainer() {
  const { toasts } = useApp()

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {ICONS[t.type] || ICONS.info}
          <span style={{ fontSize: '0.875rem' }}>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
