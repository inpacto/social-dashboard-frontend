import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

interface MainTopic {
    id: number;
    name: string;
    mentions_count: number;
}

interface TopicsProps {
    mainTopics: MainTopic[];
}

const Topics: React.FC<TopicsProps> = ({ mainTopics }) => {
    if (!mainTopics) {
        return <div className="text-center p-10">Carregando dados dos tópicos...</div>;
    }

    const dadosGraficoBarras = mainTopics.map(topico => ({
        name: topico.name.length > 20 ? topico.name.substring(0, 17) + '...' : topico.name,
        Menções: topico.mentions_count,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

            <div className="bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-md font-semibold text-white">Ações do MJSP / Principais Temas</h2>
                    <span className="text-xs text-gray-400">Últimos 2 dias</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        layout="vertical"
                        data={dadosGraficoBarras}
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                    >
                        <XAxis type="number" stroke="#9CA3AF" fontSize={10} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#9CA3AF"
                            fontSize={10}
                            width={100}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
                            labelStyle={{ color: '#D1D5DB' }}
                        />
                        <Bar dataKey="Menções" fill="#14B8A6" barSize={15}></Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center items-center mt-2 text-xs text-gray-400">
                    <span className="w-3 h-3 bg-[#14B8A6] rounded-full mr-1"></span> Menções
                </div>
            </div>
        </div>
    );
};

export default Topics;
