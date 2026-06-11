'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type Equipamento = {
  id: string
  nome: string
  marca_modelo: string
  numero_serie: string
  observacoes: string
  created_at: string
}

export default function Equipamentos() {
  const [nome, setNome] = useState('')
  const [marcaModelo, setMarcaModelo] = useState('')
  const [numeroSerie, setNumeroSerie] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { buscarEquipamentos() }, [])

  async function buscarEquipamentos() {
    const { data } = await supabase.from('equipamentos').select('*').order('created_at', { ascending: false })
    if (data) setEquipamentos(data)
  }

  async function salvar() {
    if (!nome) { setMensagem('Nome é obrigatório!'); return }
    setCarregando(true)
    const { error } = await supabase.from('equipamentos').insert([{ nome, marca_modelo: marcaModelo, numero_serie: numeroSerie, observacoes }])
    if (error) {
      setMensagem('Erro: ' + error.message)
    } else {
      setMensagem('Equipamento salvo com sucesso!')
      setNome(''); setMarcaModelo(''); setNumeroSerie(''); setObservacoes('')
      buscarEquipamentos()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function excluir(id: string) {
    await supabase.from('equipamentos').delete().eq('id', id)
    buscarEquipamentos()
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
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${mensagem.includes('sucesso') ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'}`}>
            {mensagem}
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">+ Novo Equipamento</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nome do Equipamento', value: nome, set: setNome, placeholder: 'Ex: Compressor de Ar' },
              { label: 'Marca / Modelo', value: marcaModelo, set: setMarcaModelo, placeholder: 'Ex: Schulz MSV 6/30' },
              { label: 'Número de Série', value: numeroSerie, set: setNumeroSerie, placeholder: 'Ex: SN-00123456' },
            ].map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label className="block text-sm text-slate-400 mb-1">{label}</label>
                <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              </div>
            ))}
            <div>
              <label className="block text-sm text-slate-400 mb-1">Observações</label>
              <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Detalhes adicionais..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"/>
            </div>
          </div>
          <button onClick={salvar} disabled={carregando}
            className="mt-6 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {carregando ? 'Salvando...' : 'Salvar Equipamento'}
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Equipamentos Cadastrados</h2>
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">{equipamentos.length} equipamentos</span>
          </div>
          {equipamentos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">Nenhum equipamento cadastrado ainda.</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {equipamentos.map(e => (
                <div key={e.id} className="p-5 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">⚙️ {e.nome}</p>
                    <p className="text-sm text-slate-400">{e.marca_modelo} · Série: {e.numero_serie}</p>
                    {e.observacoes && <p className="text-xs text-slate-500 mt-1">{e.observacoes}</p>}
                  </div>
                  <button onClick={() => excluir(e.id)} className="text-red-400 hover:text-red-300 text-sm">Excluir</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}