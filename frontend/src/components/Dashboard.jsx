import { Link } from 'react-router-dom'
import { Users, BedDouble, Hotel, TrendingUp, UserCheck, UserX, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Dashboard.css'

function StatCard({ label, value, icon: Icon, accent, sub }) {
  return (
    <div className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div className="stat-icon">
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const {
    clientes, acomodacoes, hospedagens,
    getTitulares, getDependentes, getClienteById, getAcomodacaoById
  } = useApp()

  const titulares   = getTitulares()
  const dependentes = getDependentes()

  return (
    <div className="dashboard">
      {/* Welcome */}
      <div className="dashboard-welcome">
        <div>
          <h1 className="font-display dashboard-heading">
            Bem-vindo ao <span className="text-gold">Atlantis</span>
          </h1>
          <p className="text-dim">Resumo operacional de hoje</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <StatCard
          label="Total de Clientes"
          value={clientes.length}
          icon={Users}
          accent="var(--teal-light)"
          sub={`${titulares.length} titulares`}
        />
        <StatCard
          label="Dependentes"
          value={dependentes.length}
          icon={UserCheck}
          accent="var(--gold)"
          sub="vinculados a titulares"
        />
        <StatCard
          label="Acomodações"
          value={acomodacoes.length}
          icon={BedDouble}
          accent="#9B59B6"
          sub="tipos disponíveis"
        />
        <StatCard
          label="Hospedagens Ativas"
          value={hospedagens.length}
          icon={Hotel}
          accent="#2ECC71"
          sub="check-ins realizados"
        />
      </div>

      <div className="dashboard-cols">
        {/* Hospedagens ativas */}
        <div className="card dashboard-panel">
          <div className="dashboard-panel-header">
            <h3 className="font-display" style={{ fontSize: '1.2rem' }}>
              Hóspedes Ativos
            </h3>
            <Link to="/hospedagens" className="btn btn-secondary btn-sm">
              Ver todos <ArrowRight size={13} />
            </Link>
          </div>

          {hospedagens.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Hotel size={28} /></div>
              <p>Nenhum hóspede no momento</p>
            </div>
          ) : (
            <div className="hosp-list">
              {hospedagens.map(h => {
                const cli  = getClienteById(h.clienteId)
                const acom = getAcomodacaoById(h.acomodacaoId)
                return (
                  <div key={h.id} className="hosp-row">
                    <div className="hosp-avatar">{cli?.nome.charAt(0) ?? '?'}</div>
                    <div className="hosp-info">
                      <span className="hosp-name">{cli?.nome ?? '—'}</span>
                      <span className="hosp-acom">{acom?.nomeAcomodacao ?? '—'}</span>
                    </div>
                    <div className="hosp-date">
                      <span className="status-dot active" />
                      {new Date(h.dataEntrada).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Acomodações resumo */}
        <div className="card dashboard-panel">
          <div className="dashboard-panel-header">
            <h3 className="font-display" style={{ fontSize: '1.2rem' }}>
              Acomodações
            </h3>
            <Link to="/acomodacoes" className="btn btn-secondary btn-sm">
              Ver todas <ArrowRight size={13} />
            </Link>
          </div>

          <div className="acom-mini-list">
            {acomodacoes.map(a => (
              <div key={a.id} className="acom-mini-row">
                <span className="acom-mini-emoji">{a.imagem}</span>
                <div>
                  <span className="acom-mini-name">{a.nomeAcomodacao}</span>
                  <span className="acom-mini-price">
                    R$ {a.preicoNoite.toLocaleString('pt-BR')}/noite
                  </span>
                </div>
                <span className="badge badge-teal acom-mini-badge">
                  {a.suite > 0 ? `${a.suite} suíte${a.suite > 1 ? 's' : ''}` : 'Standard'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clientes recentes */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="dashboard-panel-header" style={{ marginBottom: 16 }}>
          <h3 className="font-display" style={{ fontSize: '1.2rem' }}>
            Titulares Cadastrados
          </h3>
          <Link to="/clientes" className="btn btn-secondary btn-sm">
            Gerenciar <ArrowRight size={13} />
          </Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nome Social</th>
                <th>Cidade</th>
                <th>Dependentes</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {titulares.slice(0, 5).map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="hosp-avatar" style={{ width: 30, height: 30, fontSize: '0.75rem' }}>
                        {c.nome.charAt(0)}
                      </div>
                      {c.nome}
                    </div>
                  </td>
                  <td className="text-dim">{c.nomeSocial}</td>
                  <td className="text-dim">{c.endereco?.cidade}</td>
                  <td>
                    <span className="badge badge-teal">
                      {c.dependentes.length} dep.
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">
                      <span className="status-dot active" style={{ width: 6, height: 6 }} />
                      Ativo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
