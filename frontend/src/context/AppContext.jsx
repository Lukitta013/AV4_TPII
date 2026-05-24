import { createContext, useContext, useState, useCallback } from 'react'
import {
  CLIENTES_INICIAIS,
  ACOMODACOES,
  HOSPEDAGENS_INICIAIS,
  gerarId,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [clientes, setClientes] = useState(() =>
    JSON.parse(JSON.stringify(CLIENTES_INICIAIS))
  )
  const [acomodacoes] = useState(ACOMODACOES)
  const [hospedagens, setHospedagens] = useState(HOSPEDAGENS_INICIAIS)
  const [toasts, setToasts] = useState([])

  // ─── Toast ────────────────────────────────────────────────
  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  // ─── Clientes ─────────────────────────────────────────────
  const adicionarCliente = useCallback((dados) => {
    const novo = { ...dados, id: gerarId(), dataCadastro: new Date().toISOString().slice(0, 10), dependentes: [] }
    setClientes(prev => {
      const atualizado = [...prev, novo]
      if (novo.titularId) {
        return atualizado.map(c =>
          c.id === novo.titularId
            ? { ...c, dependentes: [...c.dependentes, novo.id] }
            : c
        )
      }
      return atualizado
    })
    addToast(`${dados.nome} cadastrado(a) com sucesso!`, 'success')
    return novo
  }, [addToast])

  const atualizarCliente = useCallback((id, dados) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...dados } : c))
    addToast('Cliente atualizado com sucesso!', 'success')
  }, [addToast])

  const excluirCliente = useCallback((id) => {
    setClientes(prev => {
      const alvo = prev.find(c => c.id === id)
      if (!alvo) return prev
      // remover dependentes também
      const ids = new Set([id, ...alvo.dependentes])
      return prev
        .filter(c => !ids.has(c.id))
        .map(c => ({
          ...c,
          dependentes: c.dependentes.filter(d => !ids.has(d))
        }))
    })
    // remover hospedagens vinculadas
    setHospedagens(prev => prev.filter(h => h.clienteId !== id))
    addToast('Cliente excluído.', 'info')
  }, [addToast])

  const promoverDependente = useCallback((depId) => {
    setClientes(prev => {
      const dep = prev.find(c => c.id === depId)
      if (!dep) return prev
      const titularId = dep.titularId
      return prev.map(c => {
        if (c.id === depId) return { ...c, titularId: null }
        if (c.id === titularId) return { ...c, dependentes: c.dependentes.filter(d => d !== depId) }
        return c
      })
    })
    addToast('Dependente promovido a titular!', 'success')
  }, [addToast])

  // ─── Hospedagens ──────────────────────────────────────────
  const realizarCheckIn = useCallback((clienteId, acomodacaoId) => {
    const nova = {
      id: `hosp-${Date.now()}`,
      clienteId,
      acomodacaoId,
      dataEntrada: new Date().toISOString(),
    }
    setHospedagens(prev => [...prev, nova])
    addToast('Check-in realizado com sucesso!', 'success')
  }, [addToast])

  const realizarCheckOut = useCallback((hospId) => {
    setHospedagens(prev => prev.filter(h => h.id !== hospId))
    addToast('Check-out realizado.', 'info')
  }, [addToast])

  // ─── Helpers ──────────────────────────────────────────────
  const getTitulares = () => clientes.filter(c => !c.titularId)
  const getDependentes = () => clientes.filter(c => c.titularId)
  const getClienteById = (id) => clientes.find(c => c.id === id)
  const getAcomodacaoById = (id) => acomodacoes.find(a => a.id === id)
  const clienteEstaHospedado = (id) => hospedagens.some(h => h.clienteId === id)

  const ctx = {
    clientes, acomodacoes, hospedagens, toasts,
    adicionarCliente, atualizarCliente, excluirCliente, promoverDependente,
    realizarCheckIn, realizarCheckOut,
    getTitulares, getDependentes, getClienteById, getAcomodacaoById,
    clienteEstaHospedado, addToast,
  }

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
