import { useState } from 'react'
import { Eye, EyeOff, Waves } from 'lucide-react'
import { USUARIO_DEMO } from '../data/mockData'
import './Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    setTimeout(() => {
      if (email === USUARIO_DEMO.email && senha === USUARIO_DEMO.senha) {
        onLogin({ nome: USUARIO_DEMO.nome, cargo: USUARIO_DEMO.cargo })
      } else {
        setErro('E-mail ou senha incorretos.')
        setCarregando(false)
      }
    }, 900)
  }

  return (
    <div className="login-root">
      {/* Animated ocean background */}
      <div className="login-bg">
        <div className="login-wave login-wave-1" />
        <div className="login-wave login-wave-2" />
        <div className="login-wave login-wave-3" />
        <div className="login-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="login-particle" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className="login-container">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <Waves size={28} />
          </div>
          <h1 className="login-title">Atlantis</h1>
          <p className="login-tagline">Sistema de Gestão Premium</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-card-header">
            <h2>Bem-vindo(a)</h2>
            <p>Insira suas credenciais para acessar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                className="form-input"
                type="email"
                placeholder="admin@atlantis.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  style={{ paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(v => !v)}
                  className="login-eye-btn"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {erro && (
              <div className="login-error">
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary login-submit-btn"
              disabled={carregando}
            >
              {carregando ? (
                <span className="login-spinner" />
              ) : (
                'Entrar no Sistema'
              )}
            </button>
          </form>

          <div className="login-hint">
            <span>Demo:</span>
            <code>admin@atlantis.com</code>
            <span>/</span>
            <code>123456</code>
          </div>
        </div>

        <p className="login-footer">
          © 2025 Atlantis · Sistema de Gestão de Clubes, Hotéis e Resorts
        </p>
      </div>
    </div>
  )
}
