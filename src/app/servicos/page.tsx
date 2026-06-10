export default function Servicos() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Serviços</h1>
            <p className="text-gray-500 mt-1">Registre os serviços realizados</p>
          </div>
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Voltar
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Novo Serviço</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Cliente</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Selecione o cliente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Equipamento</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Selecione o equipamento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tipo de Serviço</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Selecione</option>
                <option value="manutencao">Manutenção preventiva</option>
                <option value="conserto">Conserto / reparo</option>
                <option value="instalacao">Instalação</option>
                <option value="venda">Venda de peça</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Valor (R$)</label>
              <input type="number" placeholder="0,00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Data</label>
              <input type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="pendente">Pendente</option>
                <option value="andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Descrição do Serviço</label>
              <textarea placeholder="Descreva o que foi feito..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 h-20"/>
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
            Salvar Serviço
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">Serviços Realizados</h2>
          </div>
          <div className="p-6 text-center text-gray-400 text-sm">
            Nenhum serviço registrado ainda.
          </div>
        </div>

      </div>
    </main>
  )
}