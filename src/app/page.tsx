'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [checando, setChecando] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login'
      else setChecando(false)
    })
  }, [])

  async function sair() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (checando) return <main className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-slate-400">Carregando...</p></main>

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-6">🔧</div>
        <h1 className="text-5xl font-bold text-white mb-4">SistemaManu</h1>
        <p className="text-slate-400 text-lg mb-12">
          Gestão completa de equipamentos e serviços para assistência técnica
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <a href="/clientes" className="bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 rounded-2xl p-6 transition-all">
            <div className="text-4xl mb-3">👥</div>
            <h2 className="text-white font-semibold text-lg">Clientes</h2>
            <p className="text-slate-400 text-sm mt-1">Gerencie seus clientes</p>
          </a>
          <a href="/equipamentos" className="bg-slate-800 hover:bg-purple-600 border border-slate-700 hover:border-purple-500 rounded-2xl p-6 transition-all">
            <div className="text-4xl mb-3">⚙️</div>
            <h2 className="text-white font-semibold text-lg">Equipamentos</h2>
            <p className="text-slate-400 text-sm mt-1">Controle os equipamentos</p>
          </a>
          <a href="/servicos" className="bg-slate-800 hover:bg-green-600 border border-slate-700 hover:border-green-500 rounded-2xl p-6 transition-all">
            <div className="text-4xl mb-3">🛠️</div>
            <h2 className="text-white font-semibold text-lg">Serviços</h2>
            <p className="text-slate-400 text-sm mt-1">Registre os serviços</p>
          </a>
        </div>
        <button onClick={sair} className="text-slate-500 hover:text-red-400 text-sm transition-colors">
          Sair do sistema →
        </button>
      </div>
    </main>
  )
}