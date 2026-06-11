'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type Servico = {
  id: string
  tipo: string
  descricao: string
  valor: number
  data: string
  status: string
  created_at: string
}

export default function Servicos() {
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [status, setStatus] = useState('pendente')
  const [mensagem, setMensagem] = useState('')
  const [servicos, setServicos] = useState<Servico[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { buscarServicos() }, [])

  async function buscarServicos() {
    const { data: rows } = await supabase.from('servicos').select('*').order('created_at', { ascending: false })
    if (rows) setServicos(rows)
  }

  async function salvar() {
    if (!tipo) { setMensagem('Tipo é obrigatório!'); return }
    setCarregando(true)
    const { error } = await supabase.from('servicos').insert([{ tipo, descricao, valor: parseFloat(valor) || 0, data, status }])
    if (error) {
      setMensagem('Erro: ' + error.message)
    } else {
      setMensagem('Serviço salvo com sucesso!')
      setTipo(''); setDescricao(''); setValor(''); setData(''); setStatus('pendente')
      buscarServicos()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function excluir(id: string) {
    await supabase.from('servicos').delete().eq('id', id)
    buscarServicos()
  }

  const statusCor: Record<string, string> = {
    pendente: 'bg-yellow-900 text-yellow-300',
    andamento: 'bg-blue-900 text-blue-300',
    concluido: 'bg-green-900 text-green-300',
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">🛠️ Serviços</h1>
            <p className="text-slate-400 mt-1">Registre os serviços realizados</p>
          </div>
          <a href="/" className="text-slate-400 hover:text-white text-sm border border-slate-600 px-4 py-2 rounded-lg">← Voltar</a>
        </div>

        {mensagem && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${mensagem.includes('sucesso') ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">+ Novo Serviço</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Tipo de Serviço</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Selecione</option>
                <option value="Manutenção preventiva">Manutenção preventiva</option>
                <option value="Conserto / reparo">Conserto / reparo</option>
                <option value="Instalação">Instalação</option>
                <option value="Venda de peça">Venda de peça</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Valor (R$)</label>
              <input value={valor} onChange={e => setValor(e.target.value)} type="number" placeholder="0,00"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Data</label>
              <input value={data} onChange={e => setData(e.target.value)} type="date"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="pendente">Pendente</option>
                <option value="andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1">Descrição</label>
              <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva o que foi feito..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 h-20"/>
            </div>
          </div>
          <button onClick={salvar} disabled={carregando}
            className="mt-6 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {carregando ? 'Salvando...' : 'Salvar Serviço'}
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Serviços Registrados</h2>
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">{servicos.length} serviços</span>
          </div>
          {servicos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">Nenhum serviço registrado ainda.</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {servicos.map(s => (
                <div key={s.id} className="p-5 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-white">🛠️ {s.tipo}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusCor[s.status] || 'bg-slate-700 text-slate-300'}`}>{s.status}</span>
                    </div>
                    <p className="text-sm text-slate-400">{s.data} · R$ {s.valor?.toFixed(2)}</p>
                    {s.descricao && <p className="text-xs text-slate-500 mt-1">{s.descricao}</p>}
                  </div>
                  <button onClick={() => excluir(s.id)} className="text-red-400 hover:text-red-300 text-sm">Excluir</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}