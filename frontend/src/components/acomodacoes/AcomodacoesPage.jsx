import { BedDouble, Car, Wind, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Acomodacoes.css'

function AcomodacaoCard({ a }) {
  const detalhe = (label, val) => (
    <div className="acom-detalhe">
      <span className="detail-label">{label}</span>
      <span className="detail-val">{val}</span>
    </div>
  )

  return (
    <div className="acom-card">
      <div className="acom-card-top">
        <div className="acom-emoji">{a.imagem}</div>
        <div className="acom-card-info">
          <h3 className="acom-name font-display">{a.nomeAcomodacao}</h3>
          <div className="acom-price">
            R$ {a.preicoNoite.toLocaleString('pt-BR')}
            <span>/noite</span>
          </div>
        </div>
        <div className="acom-badges">
          {a.climatizacao && (
            <span className="badge badge-teal"><Wind size={10} /> A/C</span>
          )}
          {a.garagem > 0 && (
            <span className="badge badge-gold"><Car size={10} /> {a.garagem} vaga{a.garagem > 1 ? 's' : ''}</span>
          )}
          {a.suite > 0 && (
            <span className="badge badge-success"><Star size={10} /> {a.suite} suíte{a.suite > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <p className="acom-desc">{a.descricao}</p>

      <div className="divider" style={{ margin: '14px 0' }} />

      <div className="acom-details-grid">
        {a.camaSolteiro > 0 && detalhe('Cama Solteiro', a.camaSolteiro)}
        {a.camaCasal   > 0 && detalhe('Cama Casal',    a.camaCasal)}
        {a.suite       > 0 && detalhe('Suítes',         a.suite)}
        {detalhe('Garagem', a.garagem > 0 ? `${a.garagem} vaga${a.garagem > 1 ? 's' : ''}` : '—')}
        {detalhe('Climatização', a.climatizacao ? 'Sim' : 'Não')}
      </div>
    </div>
  )
}

export default function AcomodacoesPage() {
  const { acomodacoes } = useApp()

  const totalCamas = acomodacoes.reduce(
    (s, a) => s + a.camaSolteiro + a.camaCasal, 0
  )
  const totalSuites = acomodacoes.reduce((s, a) => s + a.suite, 0)

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Acomodações</h1>
          <p className="page-subtitle">
            {acomodacoes.length} tipos · {totalSuites} suítes · {totalCamas} camas no total
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 6 }}>🏨</div>
          <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            {acomodacoes.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Tipos de Acomodação
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 6 }}>🛏️</div>
          <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            {totalCamas}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Total de Camas
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 6 }}>⭐</div>
          <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            {totalSuites}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Total de Suítes
          </div>
        </div>
      </div>

      {/* Grid de acomodações */}
      <div className="acom-grid">
        {acomodacoes.map(a => <AcomodacaoCard key={a.id} a={a} />)}
      </div>
    </div>
  )
}
