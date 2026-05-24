import { useState } from 'react'
import { Plus, LogOut, Hotel, X, Calendar } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Hospedagens.css'

// ── Modal Check-in ─────────────────────────────────────────────────────────
function CheckInModal({ onClose }) {
  const {
    getTitulares, acomodacoes,
    realizarCheckIn, clienteEstaHospedado
  } = useApp()

  const [clienteId, setClienteId]   = useState('')
  const [acomodId,  setAcomodId]    = useState('')

  const titulares = getTitulares().filter(c => !clienteEstaHospedado(c.id))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!clienteId || !acomodId) return
    realizarCheckIn(clienteId, acomodId)
    onClose()
  }

  const acomSelecionada = acomodacoes.find(a => a.id === acomodId)

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="font-display modal-title">Registrar Check-in</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Cliente Titular *</label>
            <select
              className="form-select"
              value={clienteId}
              onChange={e => setClienteId(e.target.value)}
              required
            >
              <option value="">Selecione um cliente...</option>
              {titulares.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            {getTitulares().length > 0 && titulares.length === 0 && (
              <span style={{ fontSize: '0.78rem', color: '#E74C3C' }}>
                Todos os titulares já estão hospedados.
              </span>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Acomodação *</label>
            <select
              className="form-select"
              value={acomodId}
              onChange={e => setAcomodId(e.target.value)}
              required
            >
              <option value="">Selecione uma acomodação...</option>
              {acomodacoes.map(a => (
                <option key={a.id} value={a.id}>
                  {a.imagem} {a.nomeAcomodacao} — R$ {a.preicoNoite}/noite
                </option>
              ))}
            </select>
          </div>

          {acomSelecionada && (
            <div className="acom-preview">
              <span className="acom-preview-emoji">{acomSelecionada.imagem}</span>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--cream)' }}>{acomSelecionada.nomeAcomodacao}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cream-dim)' }}>{acomSelecionada.descricao}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.1rem', marginLeft: 'auto' }}>
                R$ {acomSelecionada.preicoNoite.toLocaleString('pt-BR')}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">
              <Hotel size={14} /> Confirmar Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Card de hospedagem ─────────────────────────────────────────────────────
function HospedagemCard({ h, onCheckOut }) {
  const { getClienteById, getAcomodacaoById } = useApp()
  const cli  = getClienteById(h.clienteId)
  const acom = getAcomodacaoById(h.acomodacaoId)

  const entrada = new Date(h.dataEntrada)
  const agora   = new Date()
  const dias    = Math.max(1, Math.ceil((agora - entrada) / 86400000))
  const total   = acom ? acom.preicoNoite * dias : 0

  return (
    <div className="hosp-card">
      <div className="hosp-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="hosp-avatar" style={{ width: 44, height: 44, fontSize: '1rem' }}>
            {cli?.nome.charAt(0) ?? '?'}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--cream)' }}>
              {cli?.nome ?? '—'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--cream-dim)' }}>
              {cli?.nomeSocial}
            </div>
          </div>
        </div>
        <span className="badge badge-success">
          <span className="status-dot active" style={{ width: 6, height: 6 }} />
          Ativo
        </span>
      </div>

      <div className="divider" style={{ margin: '14px 0' }} />

      <div className="hosp-card-acom">
        <span className="acom-emoji" style={{ fontSize: '1.6rem' }}>{acom?.imagem}</span>
        <div>
          <div style={{ fontWeight: 500, color: 'var(--cream)' }}>{acom?.nomeAcomodacao}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--cream-dim)' }}>
            {acom?.suite > 0 ? `${acom.suite} suíte(s)` : 'Standard'} · Climatizado
          </div>
        </div>
      </div>

      <div className="hosp-card-stats">
        <div className="hosp-stat">
          <span className="detail-label"><Calendar size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />Check-in</span>
          <span className="detail-val">{entrada.toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="hosp-stat">
          <span className="detail-label">Diárias</span>
          <span className="detail-val">{dias} dia{dias > 1 ? 's' : ''}</span>
        </div>
        <div className="hosp-stat">
          <span className="detail-label">Total estimado</span>
          <span className="detail-val text-gold">R$ {total.toLocaleString('pt-BR')}</span>
        </div>
      </div>

      <button
        className="btn btn-danger"
        style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}
        onClick={() => onCheckOut(h)}
      >
        <LogOut size={14} /> Check-out
      </button>
    </div>
  )
}

// ── Confirm checkout ───────────────────────────────────────────────────────
function ConfirmCheckOut({ h, onConfirm, onClose }) {
  const { getClienteById, getAcomodacaoById } = useApp()
  const cli  = getClienteById(h.clienteId)
  const acom = getAcomodacaoById(h.acomodacaoId)
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <h3 className="font-display modal-title">Confirmar Check-out</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ marginBottom: 16 }}>
          Confirma o check-out de <strong>{cli?.nome}</strong> da acomodação <strong>{acom?.nomeAcomodacao}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Confirmar Check-out</button>
        </div>
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function HospedagensPage() {
  const { hospedagens, realizarCheckOut } = useApp()
  const [modalCheckIn, setModalCheckIn]   = useState(false)
  const [checkingOut, setCheckingOut]     = useState(null)

  const handleCheckOut = (h) => setCheckingOut(h)
  const confirmCheckOut = () => {
    realizarCheckOut(checkingOut.id)
    setCheckingOut(null)
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hospedagens</h1>
          <p className="page-subtitle">{hospedagens.length} hóspede(s) ativo(s) no momento</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalCheckIn(true)}>
          <Plus size={16} /> Novo Check-in
        </button>
      </div>

      {hospedagens.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><Hotel size={32} /></div>
            <p style={{ fontSize: '1rem', color: 'var(--cream)' }}>Nenhum hóspede no momento</p>
            <p style={{ fontSize: '0.85rem' }}>Realize um check-in para começar</p>
            <button className="btn btn-primary" onClick={() => setModalCheckIn(true)}>
              <Plus size={14} /> Registrar Check-in
            </button>
          </div>
        </div>
      ) : (
        <div className="hosp-cards-grid">
          {hospedagens.map(h => (
            <HospedagemCard key={h.id} h={h} onCheckOut={handleCheckOut} />
          ))}
        </div>
      )}

      {modalCheckIn && <CheckInModal onClose={() => setModalCheckIn(false)} />}
      {checkingOut  && (
        <ConfirmCheckOut
          h={checkingOut}
          onConfirm={confirmCheckOut}
          onClose={() => setCheckingOut(null)}
        />
      )}
    </div>
  )
}
