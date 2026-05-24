import { useState, useMemo } from 'react'
import {
  Plus, Search, Edit2, Trash2, UserCheck, Users,
  ChevronDown, ChevronUp, X, Save, User
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { TIPO_DOCUMENTO } from '../../data/mockData'
import './Clientes.css'

// ── Modal de Cadastro/Edição ───────────────────────────────────────────────
function ClienteModal({ cliente, titulares, onSave, onClose }) {
  const isEdit = !!cliente
  const [form, setForm] = useState({
    nome:          cliente?.nome         ?? '',
    nomeSocial:    cliente?.nomeSocial   ?? '',
    dataNascimento:cliente?.dataNascimento ?? '',
    titularId:     cliente?.titularId    ?? null,
    endereco: {
      rua:          cliente?.endereco?.rua          ?? '',
      bairro:       cliente?.endereco?.bairro        ?? '',
      cidade:       cliente?.endereco?.cidade        ?? '',
      estado:       cliente?.endereco?.estado        ?? '',
      pais:         cliente?.endereco?.pais          ?? 'Brasil',
      codigoPostal: cliente?.endereco?.codigoPostal  ?? '',
    },
    documentos: cliente?.documentos ?? [],
    telefones:  cliente?.telefones  ?? [{ ddd: '', numero: '' }],
    tipo: cliente?.titularId ? 'dependente' : 'titular',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setEnd = (k, v) => setForm(f => ({ ...f, endereco: { ...f.endereco, [k]: v } }))

  const addDoc = () => setForm(f => ({
    ...f, documentos: [...f.documentos, { tipo: 'CPF', numero: '', dataExpedicao: '' }]
  }))
  const setDoc = (i, k, v) => setForm(f => ({
    ...f, documentos: f.documentos.map((d, idx) => idx === i ? { ...d, [k]: v } : d)
  }))
  const removeDoc = (i) => setForm(f => ({ ...f, documentos: f.documentos.filter((_, idx) => idx !== i) }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      titularId: form.tipo === 'dependente' ? form.titularId : null,
    })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <h3 className="font-display modal-title">
            {isEdit ? 'Editar Cliente' : 'Novo Cliente'}
          </h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tipo */}
          {!isEdit && (
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Tipo de Cliente</label>
              <div className="tipo-toggle">
                <button type="button"
                  className={`tipo-btn ${form.tipo === 'titular' ? 'active' : ''}`}
                  onClick={() => set('tipo', 'titular')}>
                  <User size={14} /> Titular
                </button>
                <button type="button"
                  className={`tipo-btn ${form.tipo === 'dependente' ? 'active' : ''}`}
                  onClick={() => set('tipo', 'dependente')}>
                  <Users size={14} /> Dependente
                </button>
              </div>
            </div>
          )}

          {form.tipo === 'dependente' && !isEdit && (
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Titular Responsável</label>
              <select className="form-select" value={form.titularId ?? ''} onChange={e => set('titularId', e.target.value)} required>
                <option value="">Selecione um titular...</option>
                {titulares.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
          )}

          <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
            <div className="form-group">
              <label className="form-label">Nome *</label>
              <input className="form-input" value={form.nome} onChange={e => set('nome', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Nome Social</label>
              <input className="form-input" value={form.nomeSocial} onChange={e => set('nomeSocial', e.target.value)} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Data de Nascimento</label>
            <input className="form-input" type="date" value={form.dataNascimento} onChange={e => set('dataNascimento', e.target.value)} />
          </div>

          <div className="divider" />
          <p className="modal-section-title">Endereço</p>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label className="form-label">Rua</label>
            <input className="form-input" value={form.endereco.rua} onChange={e => setEnd('rua', e.target.value)} />
          </div>

          <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
            <div className="form-group">
              <label className="form-label">Bairro</label>
              <input className="form-input" value={form.endereco.bairro} onChange={e => setEnd('bairro', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Cidade</label>
              <input className="form-input" value={form.endereco.cidade} onChange={e => setEnd('cidade', e.target.value)} />
            </div>
          </div>

          <div className="grid-2" style={{ gap: 12, marginBottom: 16 }}>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <input className="form-input" value={form.endereco.estado} onChange={e => setEnd('estado', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">CEP</label>
              <input className="form-input" value={form.endereco.codigoPostal} onChange={e => setEnd('codigoPostal', e.target.value)} />
            </div>
          </div>

          <div className="divider" />
          <div className="modal-section-header">
            <p className="modal-section-title">Documentos</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={addDoc}>
              <Plus size={13} /> Adicionar
            </button>
          </div>

          {form.documentos.map((doc, i) => (
            <div key={i} className="doc-row">
              <select className="form-select" value={doc.tipo} onChange={e => setDoc(i, 'tipo', e.target.value)} style={{ flex: '0 0 160px' }}>
                {Object.keys(TIPO_DOCUMENTO).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <input className="form-input" placeholder="Número" value={doc.numero} onChange={e => setDoc(i, 'numero', e.target.value)} />
              <input className="form-input" type="date" value={doc.dataExpedicao} onChange={e => setDoc(i, 'dataExpedicao', e.target.value)} style={{ flex: '0 0 150px' }} />
              <button type="button" className="btn btn-icon btn-danger" onClick={() => removeDoc(i)}><X size={14} /></button>
            </div>
          ))}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">
              <Save size={14} /> {isEdit ? 'Salvar alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Linha de cliente expandível ────────────────────────────────────────────
function ClienteRow({ cliente, onEdit, onDelete, onPromote, getClienteById, clienteEstaHospedado }) {
  const [expanded, setExpanded] = useState(false)
  const esTitular = !cliente.titularId
  const hospedado = clienteEstaHospedado(cliente.id)

  return (
    <>
      <tr className={expanded ? 'row-expanded' : ''}>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="hosp-avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
              {cliente.nome.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{cliente.nome}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--cream-dim)' }}>{cliente.nomeSocial}</div>
            </div>
          </div>
        </td>
        <td>
          {esTitular
            ? <span className="badge badge-gold">Titular</span>
            : <span className="badge badge-teal">Dependente</span>
          }
        </td>
        <td className="text-dim">{cliente.endereco?.cidade}, {cliente.endereco?.estado}</td>
        <td>
          {esTitular && (
            <span className="badge badge-teal">{cliente.dependentes.length} dep.</span>
          )}
          {!esTitular && cliente.titularId && (
            <span style={{ fontSize: '0.8rem', color: 'var(--cream-dim)' }}>
              {getClienteById(cliente.titularId)?.nome ?? '—'}
            </span>
          )}
        </td>
        <td>
          {hospedado
            ? <span className="badge badge-success"><span className="status-dot active" style={{ width: 6, height: 6 }} />Hospedado</span>
            : <span className="badge" style={{ background: 'var(--navy-mid)', color: 'var(--cream-dim)', border: '1px solid var(--navy-border)' }}>Livre</span>
          }
        </td>
        <td>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button className="btn btn-icon btn-secondary" onClick={() => setExpanded(v => !v)} title="Detalhes">
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button className="btn btn-icon btn-teal" onClick={() => onEdit(cliente)} title="Editar">
              <Edit2 size={14} />
            </button>
            {!esTitular && (
              <button className="btn btn-icon btn-secondary" onClick={() => onPromote(cliente.id)} title="Tornar titular">
                <UserCheck size={14} />
              </button>
            )}
            <button className="btn btn-icon btn-danger" onClick={() => onDelete(cliente)} title="Excluir">
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: 0 }}>
            <div className="cliente-detail">
              <div className="cliente-detail-grid">
                <div>
                  <span className="detail-label">Data Nasc.</span>
                  <span className="detail-val">
                    {cliente.dataNascimento
                      ? new Date(cliente.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')
                      : '—'}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Cadastro</span>
                  <span className="detail-val">{cliente.dataCadastro}</span>
                </div>
                <div>
                  <span className="detail-label">Endereço</span>
                  <span className="detail-val">
                    {cliente.endereco
                      ? `${cliente.endereco.rua}, ${cliente.endereco.bairro}`
                      : '—'}
                  </span>
                </div>
                <div>
                  <span className="detail-label">CEP</span>
                  <span className="detail-val">{cliente.endereco?.codigoPostal ?? '—'}</span>
                </div>
              </div>

              {cliente.documentos.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span className="detail-label" style={{ display: 'block', marginBottom: 6 }}>Documentos</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {cliente.documentos.map((d, i) => (
                      <span key={i} className="badge badge-gold">
                        {d.tipo}: {d.numero}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cliente.telefones.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <span className="detail-label" style={{ display: 'block', marginBottom: 6 }}>Telefones</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {cliente.telefones.map((t, i) => (
                      <span key={i} className="badge badge-teal">({t.ddd}) {t.numero}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Confirm delete ─────────────────────────────────────────────────────────
function ConfirmDelete({ cliente, onConfirm, onClose }) {
  const temDependentes = cliente.dependentes?.length > 0
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 className="font-display modal-title">Confirmar Exclusão</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ marginBottom: 12 }}>
          Tem certeza que deseja excluir <strong>{cliente.nome}</strong>?
        </p>
        {temDependentes && (
          <div style={{ background: 'var(--danger-pale)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 12, fontSize: '0.85rem', color: '#E74C3C' }}>
            ⚠️ Este titular possui {cliente.dependentes.length} dependente(s). Eles também serão excluídos.
          </div>
        )}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function ClientesPage() {
  const {
    clientes, getTitulares, getClienteById,
    adicionarCliente, atualizarCliente, excluirCliente,
    promoverDependente, clienteEstaHospedado
  } = useApp()

  const [busca, setBusca]         = useState('')
  const [filtro, setFiltro]       = useState('todos')
  const [modalAberto, setModal]   = useState(false)
  const [editando, setEditando]   = useState(null)
  const [excluindo, setExcluindo] = useState(null)

  const titulares = getTitulares()

  const lista = useMemo(() => {
    let r = clientes
    if (filtro === 'titulares')   r = r.filter(c => !c.titularId)
    if (filtro === 'dependentes') r = r.filter(c =>  c.titularId)
    if (busca.trim()) {
      const b = busca.toLowerCase()
      r = r.filter(c =>
        c.nome.toLowerCase().includes(b) ||
        c.nomeSocial.toLowerCase().includes(b) ||
        c.endereco?.cidade?.toLowerCase().includes(b)
      )
    }
    return r
  }, [clientes, filtro, busca])

  const handleSave = (dados) => {
    if (editando) {
      atualizarCliente(editando.id, dados)
    } else {
      adicionarCliente(dados)
    }
    setModal(false)
    setEditando(null)
  }

  const handleEdit = (c) => { setEditando(c); setModal(true) }
  const handleDelete = (c) => setExcluindo(c)
  const confirmDelete = () => { excluirCliente(excluindo.id); setExcluindo(null) }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">{clientes.length} cadastros · {titulares.length} titulares</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditando(null); setModal(true) }}>
          <Plus size={16} /> Novo Cliente
        </button>
      </div>

      {/* Filtros */}
      <div className="clientes-toolbar">
        <div className="search-bar">
          <Search size={15} className="search-bar-icon" />
          <input
            className="form-input"
            placeholder="Buscar por nome ou cidade..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        <div className="filtro-tabs">
          {['todos','titulares','dependentes'].map(f => (
            <button
              key={f}
              className={`filtro-tab ${filtro === f ? 'active' : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {lista.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Users size={30} /></div>
            <p>Nenhum cliente encontrado</p>
            <button className="btn btn-secondary btn-sm" onClick={() => { setBusca(''); setFiltro('todos') }}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Localização</th>
                  <th>Dependentes / Titular</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map(c => (
                  <ClienteRow
                    key={c.id}
                    cliente={c}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPromote={promoverDependente}
                    getClienteById={getClienteById}
                    clienteEstaHospedado={clienteEstaHospedado}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal cadastro/edição */}
      {modalAberto && (
        <ClienteModal
          cliente={editando}
          titulares={titulares}
          onSave={handleSave}
          onClose={() => { setModal(false); setEditando(null) }}
        />
      )}

      {/* Modal confirmação */}
      {excluindo && (
        <ConfirmDelete
          cliente={excluindo}
          onConfirm={confirmDelete}
          onClose={() => setExcluindo(null)}
        />
      )}
    </div>
  )
}
