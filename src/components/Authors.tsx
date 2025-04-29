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

const Authors: React.FC<AudienceProps> = ({ dataSources, regions, topAuthors, topSites }) => {
    if (!dataSources || !regions || !topAuthors || !topSites) {
        return <div className="text-center p-10">Carregando dados da audiência...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-md font-semibold text-white">Top Autores</h2>
                    <span className="text-xs text-gray-400">Hoje</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-end text-xs text-gray-400 pr-4 font-semibold">In.Pacto</div>
                    {topAuthors.map((autor) => (
                        <div key={autor.id} className="flex items-center justify-between border-b border-gray-700 pb-2 last:border-b-0">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-500 w-6 mr-2 text-right">{autor.rank}</span>
                                {autor.avatar_url ? (
                                    <img src={autor.avatar_url} alt={autor.name} className="w-6 h-6 rounded-full mr-2" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-600 mr-2 flex items-center justify-center text-white text-xs">
                                        {autor.name.substring(0, 1)}
                                    </div>
                                )}
                                <span className="text-sm text-white truncate" title={autor.name}>{autor.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-white pr-4">{autor.impact_score}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-md font-semibold text-white">Top Sites</h2>
                    <span className="text-xs text-gray-400">Hoje</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-end text-xs text-gray-400 pr-4">
                        <span className="w-20 text-right font-semibold">VOLUME</span>
                        <span className="w-16 text-right font-semibold ml-2">VARIAÇÃO</span>
                    </div>
                    {topSites.map((site) => (
                        <div key={site.id} className="flex items-center justify-between border-b border-gray-700 pb-2 last:border-b-0">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-500 w-6 mr-2 text-right">{site.rank}</span>
                                <span className="text-sm text-white truncate" title={site.domain}>{site.domain}</span>
                            </div>
                            <div className="flex items-center pr-4">
                                <span className="text-sm font-semibold text-white w-20 text-right">{site.volume.toLocaleString('pt-BR')}</span>
                                <span className={`flex items-center text-sm w-16 text-right ml-2 ${site.change_percentage == null ? 'text-gray-500' : site.change_percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                   {site.change_percentage != null ? (
                       <>
                           {site.change_percentage >= 0 ? <ArrowUp size={12} className="mr-1"/> : <ArrowDown size={12} className="mr-1"/>}
                           {Math.abs(site.change_percentage).toFixed(0)}%
                       </>
                   ) : (
                       '—'
                   )}
                 </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Authors;