import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface OverviewProps {
  data: {
    total_mentions: number;
    mentions_change_percentage: number;
    aggregated_reach: number;
    reach_change_percentage: number;
  };
  hourlyData: Array<{ timestamp_hour: string; mentions_count: number;}>;
}

const formatarNumero = (numero: number): string => {
  if (numero >= 1_000_000) {
    return (numero / 1_000_000).toFixed(2) + 'M';
  }
  if (numero >= 1_000) {
    return (numero / 1_000).toFixed(2) + 'K';
  }
  return numero.toString();
};

const formatarDataGrafico = (dataString: string): string => {
  const data = new Date(dataString);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const Overview: React.FC<OverviewProps> = ({ data, hourlyData }) => {
  if (!data || !hourlyData) {
    return <div className="text-center p-10">Carregando dados da visão geral...</div>;
  }

  const { total_mentions, mentions_change_percentage, aggregated_reach, reach_change_percentage } = data;

  const dadosGrafico = hourlyData.map(item => ({
    hora: formatarDataGrafico(item.timestamp_hour),
    Menções: item.mentions_count,
  }));
  return (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md md:col-span-2 flex flex-col items-center justify-center text-center">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">Total de Menções</h2>
          <div className="flex items-center justify-center mb-2">
            <p className="text-4xl font-bold text-white mr-2">{formatarNumero(total_mentions)}</p>
            <span className={`flex items-center text-lg ${mentions_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {mentions_change_percentage >= 0 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              {Math.abs(mentions_change_percentage)}%
            </span>
          </div>
          <p className="text-xs text-gray-500">Hoje</p>
        </div>


        <div className="bg-gray-800 p-12 rounded-lg shadow-md flex flex-col justify-end text-left">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">Alcance Potencial</h2>
          <div className="flex items-center">
            <p className="text-4xl font-bold text-white mr-2">{formatarNumero(aggregated_reach)}</p>
            <span className={`flex items-center text-lg ${reach_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {reach_change_percentage >= 0 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              {Math.abs(reach_change_percentage)}%
          </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Hoje</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-gray-400 mb-4">Menções por Hora</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dadosGrafico} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="hora" stroke="#9CA3AF" fontSize={10} />
              <YAxis stroke="#9CA3AF" fontSize={10} />
              <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
                  labelStyle={{ color: '#D1D5DB' }}
                  itemStyle={{ color: '#60A5FA' }}
              />
              {/* <Bar dataKey="Queries" fill="#34D399" barSize={10} /> */}
              <Bar dataKey="Menções" fill="#60A5FA" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-1 text-right">Hoje</p>
        </div>
      </div>
  );
};

export default Overview;
