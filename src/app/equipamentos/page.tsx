export default function Equipamentos() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Equipamentos</h1>
            <p className="text-gray-500 mt-1">Gerencie os equipamentos dos clientes</p>
          </div>
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Voltar
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Novo Equipamento</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nome do Equipamento</label>
              <input type="text" placeholder="Ex: Compressor de Ar"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Marca / Modelo</label>
              <input type="text" placeholder="Ex: Schulz MSV 6/30"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Número de Série</label>
              <input type="text" placeholder="Ex: SN-00123456"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Cliente</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione o cliente</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Observações</label>
              <textarea placeholder="Detalhes adicionais sobre o equipamento..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"/>
            </div>
          </div>
          <button className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 text-sm font-medium">
            Salvar Equipamento
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">Equipamentos Cadastrados</h2>
          </div>
          <div className="p-6 text-center text-gray-400 text-sm">
            Nenhum equipamento cadastrado ainda.
          </div>
        </div>

      </div>
    </main>
  )
}