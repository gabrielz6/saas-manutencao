'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Clientes() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function salvarCliente() {
    if (!nome) { setMensagem('Nome é obrigatório!'); return }
    
    const { error } = await supabase
      .from('clientes')
      .insert([{ nome, telefone, email, empresa }])

    if (error) {
      setMensagem('Erro ao salvar: ' + error.message)
    } else {
      setMensagem('Cliente salvo com sucesso!')
      setNome(''); setTelefone(''); setEmail(''); setEmpresa('')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
            <p className="text-gray-500 mt-1">Gerencie seus clientes</p>
          </div>
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">← Voltar</a>
        </div>

        {mensagem && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Novo Cliente</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nome</label>
              <input value={nome} onChange={e => setNome(e.target.value)} type="text" placeholder="Nome do cliente"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Telefone</label>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} type="text" placeholder="(00) 00000-0000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@exemplo.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Empresa</label>
              <input value={empresa} onChange={e => setEmpresa(e.target.value)} type="text" placeholder="Nome da empresa"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          <button onClick={salvarCliente} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            Salvar Cliente
          </button>
        </div>
      </div>
    </main>
  )
}