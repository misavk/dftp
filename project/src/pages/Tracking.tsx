import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface TrackingStep {
  id: string;
  tipo: string;
  numero: string;
  status: string;
  data: string;
  descricao: string;
  usuario: string;
  cte_numero: string;
  cte_aut_data: string;
  razao_remetente: string;
  cnpj_remetente: string;
  razao_destinatario: string;
  cnpj_destinatario: string;
  servico: string;
  status_minuta: string;
  entrega_nome: string;
  entrega_rg: string;
  entrega_grau: string | null;
  data_entrega: string;
  hora_entrega: string;
}

const Tracking = () => {
  const [formData, setFormData] = useState({
    trackingNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingStep[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      codigo: formData.trackingNumber,
      comprovante: '0',
    });

    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer 9229ab9ec2818b572dd3865802686293241da515de0813e23f', // Substitua pelo seu token
    };

    try {
      const response = await fetch(
        `https://dftransportes.brudam.com.br/api/v1/tracking/ocorrencias/minuta?${params.toString()}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const data = await response.json();
      if (response.ok && data.data && data.data.length > 0) {
        const trackingSteps = data.data[0].dados.map((item: any) => ({
          id: item.id,
          tipo: item.tipo,
          numero: item.numero,
          status: item.status,
          data: item.data,
          descricao: item.descricao,
          usuario: item.usuario,
          cte_numero: item.cte_numero,
          cte_aut_data: item.cte_aut_data,
          razao_remetente: item.razao_remetente,
          cnpj_remetente: item.cnpj_remetente,
          razao_destinatario: item.razao_destinatario,
          cnpj_destinatario: item.cnpj_destinatario,
          servico: item.servico,
          status_minuta: item.status_minuta.replace('saída efetivada', 'saída efetivada'),
          entrega_nome: item.entrega_nome,
          entrega_rg: item.entrega_rg,
          entrega_grau: item.entrega_grau,
          data_entrega: item.data_entrega,
          hora_entrega: item.hora_entrega,
        }));

        setTrackingData(trackingSteps);
        setShowResults(true);
      } else {
        setError('Erro ao rastrear a carga. Verifique o número da minuta.');
      }
    } catch (error) {
      setError('Erro de rede. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const groupTrackingData = (data: TrackingStep[]) => {
    const seen = new Set();
    const groupedData: Record<string, TrackingStep[]> = {};

    data.forEach((item) => {
      const key = `${item.cte_numero}-${item.status_minuta}-${item.data_entrega}-${item.hora_entrega}`;

      if (!seen.has(key)) {
        seen.add(key);

        if (!groupedData[key]) {
          groupedData[key] = [];
        }

        groupedData[key].push(item);
      }
    });

    return groupedData;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 10; // Posição inicial para o texto no PDF

    // Adiciona o título
    doc.setFontSize(18);
    doc.text("Resultados do Rastreamento", 10, y);
    y += 10;

    if (trackingData) {
      Object.entries(groupTrackingData(trackingData)).forEach(([key, steps]) => {
        const [cteNumber] = key.split('-');
        doc.setFontSize(14);
        doc.text(`CTE Número: ${cteNumber}`, 10, y);
        y += 10;

        steps.forEach((step, index) => {
          doc.setFontSize(12);
          doc.text(`Descrição: ${step.descricao}`, 10, y);
          y += 5;
          doc.text(`Remetente: ${step.razao_remetente}`, 10, y);
          y += 5;
          doc.text(`Destinatário: ${step.razao_destinatario}`, 10, y);
          y += 5;
          doc.text(`CTE Número: ${step.cte_numero}`, 10, y);
          y += 5;
          doc.text(`Status Minuta: ${step.status_minuta}`, 10, y);
          y += 5;
          doc.text(`Data e Hora de Entrega: ${step.data_entrega} ${step.hora_entrega}`, 10, y);
          y += 10; // Adiciona espaçamento entre os registros
        });
      });
    }

    // Salva o PDF
    doc.save("rastreamento.pdf");
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Rastreamento de Carga</h1>

        <form onSubmit={handleTracking} className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="trackingNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Número da Minuta/Nota Fiscal
              </label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                placeholder="Informe o número"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : (
                <>
                  <Search size={20} />
                  Buscar
                </>
              )}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {showResults && (
          <div className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold">Resultados do Rastreamento</h2>
            <div className="space-y-4">
              {Object.entries(groupTrackingData(trackingData!)).map(([key, steps]) => {
                const [cteNumber] = key.split('-');
                return (
                  <div key={key} className="space-y-4">
                    <h3 className="text-lg font-semibold">CTE Número: {cteNumber}</h3>
                    {steps.map((step, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <div className="font-medium text-lg">{step.descricao}</div>
                        <div className="text-sm text-gray-600">
                          <strong>Remetente:</strong> {step.razao_remetente}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Destinatário:</strong> {step.razao_destinatario}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>CTE Número:</strong> {step.cte_numero}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Data de Autorização CTE:</strong> {step.cte_aut_data}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>CNPJ Remetente:</strong> {step.cnpj_remetente}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>CNPJ Destinatário:</strong> {step.cnpj_destinatario}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Serviço:</strong> {step.servico}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Status Minuta:</strong> {step.status_minuta}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Entrega Nome:</strong> {step.entrega_nome}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Entrega RG:</strong> {step.entrega_rg}
                        </div>
                        {step.entrega_grau && (
                          <div className="text-sm text-gray-600">
                            <strong>Entrega Grau:</strong> {step.entrega_grau}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">
                          <strong>Data e Hora de Entrega:</strong> {step.data_entrega} {step.hora_entrega}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded"
                onClick={handleGeneratePDF}
              >
                Gerar PDF
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded"
                onClick={handlePrint}
              >
                Imprimir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
