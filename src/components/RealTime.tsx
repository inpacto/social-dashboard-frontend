import React from 'react';

interface RealTimeTopic {
  id: number;
  name: string;
  size_score: number;
}

interface RealTimeProps {
  topics: RealTimeTopic[];
}

const gerarEstiloTopico = (pontuacao: number, pontuacaoMaxima: number): React.CSSProperties => {
  const intensidade = Math.max(0.2, Math.min(1, pontuacao / pontuacaoMaxima));
  const corDeFundo = `hsl(220, 80%, ${60 + intensidade * 30}%)`;

  return {
    backgroundColor: corDeFundo,
    padding: '1rem',
    borderRadius: '0.25rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: `${0.75 + intensidade * 0.5}rem`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
};

const RealTime: React.FC<RealTimeProps> = ({ topics }) => {
  if (!topics || topics.length === 0) {
    return <div className="text-center p-10">Carregando tópicos em tempo real...</div>;
  }

  const pontuacaoMaxima = Math.max(...topics.map(t => t.size_score), 0);
  const topicosOrdenados = [...topics].sort((a, b) => b.size_score - a.size_score);

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Tópicos</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>

          <div className="grid grid-cols-3 grid-rows-3 gap-2 h-80">
            {topicosOrdenados.slice(0, 9).map((topico) => (
                <div
                    key={topico.id}
                    className="bg-blue-500 rounded p-2 flex items-center justify-center text-center text-white text-sm overflow-hidden"
                    style={gerarEstiloTopico(topico.size_score, pontuacaoMaxima)}
                    title={topico.name}
                >
                  {topico.name}
                </div>
            ))}
            {Array.from({ length: Math.max(0, 9 - topics.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Clusters de Tópicos</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 mb-4"></div>
            <p className="text-sm">Falha na requisição: código 400</p>
          </div>
        </div>
      </div>
  );
};

export default RealTime;
