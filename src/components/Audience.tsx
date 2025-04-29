import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DataSource {
  id: number;
  name: string;
  percentage: number;
  color: string;
}

interface Region {
  id: number;
  name: string;
  percentage: number;
  color: string;
}

interface TopAuthor {
  id: number;
  rank: number;
  name: string;
  handle?: string;
  avatar_url?: string;
  impact_score: number;
}

interface TopSite {
  id: number;
  rank: number;
  domain: string;
  volume: number;
  change_percentage?: number | null;
}

interface AudienceProps {
  dataSources: DataSource[];
  regions: Region[];
  topAuthors: TopAuthor[];
  topSites: TopSite[];
}

const TooltipPersonalizado = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dados = payload[0].payload;
    return (
        <div className="bg-gray-700 p-2 rounded shadow-lg text-white text-xs">
          <p>{`${dados.name}: ${dados.percentage}%`}</p>
        </div>
    );
  }
  return null;
};

const LegendaPersonalizada = (props: any) => {
  const { payload } = props;
  return (
      <ul className="flex flex-wrap justify-center text-xs text-gray-400 mt-2">
        {payload.map((entrada: any, indice: number) => (
            <li key={`item-${indice}`} className="flex items-center mr-3 mb-1">
              <span style={{ backgroundColor: entrada.color }} className="w-2 h-2 rounded-full mr-1"></span>
              {entrada.payload.name} ({entrada.payload.percentage}%)
            </li>
        ))}
      </ul>
  );
};

const Audience: React.FC<AudienceProps> = ({ dataSources, regions, topAuthors, topSites }) => {
  if (!dataSources || !regions || !topAuthors || !topSites) {
    return <div className="text-center p-10">Carregando dados da audiência...</div>;
  }

  const regionsFormatadas = regions.map(region => ({
    ...region,
    percentage: parseFloat(String(region.percentage))
  }));

  console.log(regions);
  const renderizarRotuloPersonalizado = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    return null;
  };

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 w-full">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Fonte de Dados</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                  data={regionsFormatadas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderizarRotuloPersonalizado}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="percentage"
                  nameKey="name"
              >
                {dataSources.map((entrada, indice) => (
                    <Cell key={`cell-${indice}`} fill={entrada.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipPersonalizado />} />
              <Legend content={<LegendaPersonalizada />} verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Volume de Conversas por Região</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                  data={regionsFormatadas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderizarRotuloPersonalizado}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="percentage"
                  nameKey="name"
              >
                {regions.map((entrada, indice) => (
                    <Cell key={`cell-${indice}`} fill={entrada.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipPersonalizado />} />
              <Legend content={<LegendaPersonalizada />} verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};

export default Audience;
