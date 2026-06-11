'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar() {
    if (!email || !senha) { setErro('Preencha email e senha!'); return }
    setCarregando(true)
    setErro('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('Email ou senha incorretos.')
    } else {
      window.location.href = '/'
    }
    setCarregando(false)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔧</div>
          <h1 className="text-2xl font-bold text-white">SistemaManu</h1>
          <p className="text-slate-400 text-sm mt-1">Entre com sua conta</p>
        </div>

        {erro && (
          <div className="mb-4 p-3 rounded-lg bg-red-900 text-red-300 border border-red-700 text-sm">
            {erro}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="seu@email.com"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Senha</label>
            <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && entrar()}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <button onClick={entrar} disabled={carregando}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-2">
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </main>
  )
}