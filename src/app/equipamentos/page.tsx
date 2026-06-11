'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type Equipamento = { id: string; nome: string; marca_modelo: string; numero_serie: string; observacoes: string; cliente_id: string; created_at: string }
type Cliente = { id: string; nome: string }

export default function Equipamentos() {
  const [nome, setNome] = useState('')
  const [marcaModelo, setMarcaModelo] = useState('')
  const [numeroSerie, setNumeroSerie] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { buscar() }, [])

  async function buscar() {
    const { data: eq } = await supabase.from('equipamentos').select('*').order('created_at', { ascending: false })
    const { data: cl } = await supabase.from('clientes').select('id, nome').order('nome')
    if (eq) setEquipamentos(eq)
    if (cl) setClientes(cl)
  }

  function nomeCliente(id: string) {
    return clientes.find(c => c.id === id)?.nome || '—'
  }

  async function salvar() {
    if (!nome) { setMensagem('Nome é obrigatório!'); return }
    setCarregando(true)
    const { error } = await supabase.from('equipamentos').insert([{
      nome, marca_modelo: marcaModelo, numero_serie: numeroSerie, observacoes, cliente_id: clienteId || null
    }])
    if (error) { setMensagem('Erro: ' + error.message) }
    else {
      setMensagem('Equipamento salvo!')
      setNome(''); setMarcaModelo(''); setNumeroSerie(''); setObservacoes(''); setClienteId('')
      buscar()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function excluir(id: string) {
    await supabase.from('equipamentos').delete().eq('id', id)
    buscar()
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">⚙️ Equipamentos</h1>
            <p className="text-slate-400 mt-1">Gerencie os equipamentos dos clientes</p>
          </div>
          <a href="/" className="text-slate-400 hover:text-white text-sm border border-slate-600 px-4 py-2 rounded-lg">← Voltar</a>
        </div>

        {mensagem && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${mensagem.includes('salvo') ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">+ Novo Equipamento</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Nome do Equipamento</label>
              <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Compressor de Ar"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Cliente</label>
              <select value={clienteId} onChange={e => setClienteId(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">Selecione o cliente</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Marca / Modelo</label>
              <input value={marcaModelo} onChange={e => setMarcaModelo(e.target.value)} placeholder="Ex: Schulz MSV 6/30"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Número de Série</label>
              <input value={numeroSerie} onChange={e => setNumeroSerie(e.target.value)} placeholder="Ex: SN-00123456"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1">Observações</label>
              <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Detalhes adicionais..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"/>
            </div>