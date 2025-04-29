import React from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: number;
  source_name: string;
  source_icon_url?: string;
  title: string;
  snippet?: string;
  url?: string;
  timestamp: string;
  impact_score?: number;
}

interface NewsFeedProps {
  news: NewsItem[];
}

const tempoDecorrido = (dataString: string): string => {
  const data = new Date(dataString);
  const agora = new Date();
  const segundos = Math.floor((agora.getTime() - data.getTime()) / 1000);

  let intervalo = Math.floor(segundos / 31536000);
  if (intervalo > 1) return `${intervalo} anos atrás`;
  intervalo = Math.floor(segundos / 2592000);
  if (intervalo > 1) return `${intervalo} meses atrás`;
  intervalo = Math.floor(segundos / 86400);
  if (intervalo > 1) return `${intervalo} dias atrás`;
  intervalo = Math.floor(segundos / 3600);
  if (intervalo >= 1) return `${intervalo}h atrás`;
  intervalo = Math.floor(segundos / 60);
  if (intervalo > 1) return `${intervalo} minutos atrás`;
  return `${Math.floor(segundos)} segundos atrás`;
};

const CartaoNoticia: React.FC<{ item: NewsItem }> = ({ item }) => {
  return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-sm h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            {item.source_icon_url ? (
                <img src={item.source_icon_url} alt={item.source_name} className="w-6 h-6 rounded-full mr-2" />
            ) : (
                <div className="w-6 h-6 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-white text-xs">
                  {item.source_name.substring(0, 1).toUpperCase()}
                </div>
            )}
            <span className="text-sm font-medium text-gray-300">{item.source_name}</span>
          </div>
          <h3 className="text-md font-semibold text-white mb-1 leading-tight">{item.title}</h3>
          {item.snippet && (
              <p className="text-xs text-gray-400 mb-3">{item.snippet}</p>
          )}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <div className="flex items-center">
            <Newspaper size={14} className="mr-1" />
            <span>Notícia</span>
            <span className="mx-1">•</span>
            <span>{tempoDecorrido(item.timestamp)}</span>
          </div>
          {item.impact_score && (
              <span className="font-medium">Impacto: {item.impact_score}</span>
          )}
        </div>
      </div>
  );
};

const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  if (!news || news.length === 0) {
    return <div className="text-center p-10">Carregando notícias...</div>;
  }

  return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-lg font-semibold text-white">Notícias</h2>
          <span className="text-xs text-gray-400">Hoje</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {news.map(item => (
              <CartaoNoticia key={item.id} item={item} />
          ))}
        </div>
      </div>
  );
};

export default NewsFeed;
