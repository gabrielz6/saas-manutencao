'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type Cliente = {
  id: string
  nome: string
  telefone: string
  email: string
  empresa: string
  created_at: string
}

export default function Clientes() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { buscarClientes() }, [])

  async function buscarClientes() {
    const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false })
    if (data) setClientes(data)
  }

  async function salvarCliente() {
    if (!nome) { setMensagem('Nome é obrigatório!'); return }
    setCarregando(true)
    const { error } = await supabase.from('clientes').insert([{ nome, telefone, email, empresa }])
    if (error) {
      setMensagem('Erro: ' + error.message)
    } else {
      setMensagem('Cliente salvo com sucesso!')
      setNome(''); setTelefone(''); setEmail(''); setEmpresa('')
      buscarClientes()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function excluirCliente(id: string) {
    await supabase.from('clientes').delete().eq('id', id)
    buscarClientes()
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">👥 Clientes</h1>
            <p className="text-slate-400 mt-1">Gerencie seus clientes</p>
          </div>
          <a href="/" className="text-slate-400 hover:text-white text-sm border border-slate-600 px-4 py-2 rounded-lg">
            ← Voltar
          </a>
        </div>

        {mensagem && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${mensagem.includes('sucesso') ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">+ Novo Cliente</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nome', value: nome, set: setNome, placeholder: 'Nome completo', type: 'text' },
              { label: 'Telefone', value: telefone, set: setTelefone, placeholder: '(00) 00000-0000', type: 'text' },
              { label: 'Email', value: email, set: setEmail, placeholder: 'email@exemplo.com', type: 'email' },
              { label: 'Empresa', value: empresa, set: setEmpresa, placeholder: 'Nome da empresa', type: 'text' },
            ].map(({ label, value, set, placeholder, type }) => (
              <div key={label}>
                <label className="block text-sm text-slate-400 mb-1">{label}</label>
                <input value={value} onChange={e => set(e.target.value)} type={type} placeholder={placeholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            ))}
          </div>
          <button onClick={salvarCliente} disabled={carregando}
            className="mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {carregando ? 'Salvando...' : 'Salvar Cliente'}
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Clientes Cadastrados</h2>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{clientes.length} clientes</span>
          </div>
          {clientes.length === 0 ? (
            <div className="p-12 text-center text-slate-500">Nenhum cliente cadastrado ainda.</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {clientes.map(c => (
                <div key={c.id} className="p-5 flex justify-between items-center hover:bg-slate-750">
                  <div>
                    <p className="font-semibold text-white">{c.nome}</p>
                    <p className="text-sm text-slate-400">{c.empresa} · {c.telefone} · {c.email}</p>
                  </div>
                  <div className="flex gap-3">
                    <a href={`/clientes/${c.id}`} className="text-blue-400 hover:text-blue-300 text-sm">Ver detalhes →</a>
                    <button onClick={() => excluirCliente(c.id)} className="text-red-400 hover:text-red-300 text-sm">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}