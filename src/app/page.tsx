export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          SistemaManu
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Gestão de equipamentos e serviços para assistência técnica
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/clientes" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Clientes
          </a>
          <a href="/equipamentos" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900">
            Equipamentos
          </a>
          <a href="/servicos" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Serviços
          </a>
        </div>
      </div>
    </main>
  )
}