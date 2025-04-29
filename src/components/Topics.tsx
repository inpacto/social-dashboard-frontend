import React from 'react';

import { Wordcloud } from '@visx/wordcloud';
import { scaleLog } from '@visx/scale';
import { Text } from '@visx/text';

interface Hashtag {
  id: number;
  tag: string;
  frequency: number;
}

interface WordCloudTerm {
  id: number;
  term: string;
  frequency: number;
  sentiment?: string;
}

interface MainTopic {
  id: number;
  name: string;
  mentions_count: number;
}

interface TopicsProps {
  hashtags: Hashtag[];
  wordCloud: WordCloudTerm[];
}

interface WordData {
  text: string;
  value: number;
}

const obterCorSentimento = (sentiment?: string) => {
  switch (sentiment) {
    case 'positive': return '#22C55E';
    case 'negative': return '#EF4444';
    default: return '#9CA3AF';
  }
};

const Topics: React.FC<TopicsProps> = ({ hashtags, wordCloud }) => {
  if (!hashtags || !wordCloud) {
    return <div className="text-center p-10">Carregando dados dos tópicos...</div>;
  }

  const palavrasHashtags: WordData[] = hashtags.map(h => ({ text: h.tag, value: h.frequency }));
  const palavrasGerais: WordData[] = wordCloud.map(w => ({ text: w.term, value: w.frequency }));

  const escalaFonteHashtags = scaleLog({
    domain: [Math.min(...palavrasHashtags.map(w => w.value)), Math.max(...palavrasHashtags.map(w => w.value))],
    range: [10, 60],
  });

  const escalaFonteGeral = scaleLog({
    domain: [Math.min(...palavrasGerais.map(w => w.value)), Math.max(...palavrasGerais.map(w => w.value))],
    range: [10, 50],
  });

  const definirTamanhoFonteHashtags = (dado: WordData) => escalaFonteHashtags(dado.value);
  const definirTamanhoFonteGeral = (dado: WordData) => escalaFonteGeral(dado.value);

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Top Hashtags</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Wordcloud
                words={palavrasHashtags}
                width={500}
                height={300}
                fontSize={definirTamanhoFonteHashtags}
                font="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
                padding={2}
                spiral="archimedean"
                rotate={0}
                random={() => 0.5}
            >
              {(palavrasNuvem) =>
                  palavrasNuvem.map((p, i) => (
                      <Text
                          key={`${p.text ?? ''}-${i}`}
                          fill="#60A5FA"
                          textAnchor="middle"
                          transform={`translate(${p.x}, ${p.y}) rotate(${p.rotate})`}
                          fontSize={p.size}
                          fontFamily={p.font}
                      >
                        {p.text}
                      </Text>
                  ))
              }
            </Wordcloud>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-semibold text-white">Nuvem de Palavras</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Wordcloud
                words={palavrasGerais}
                width={500}
                height={300}
                fontSize={definirTamanhoFonteGeral}
                font="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
                padding={2}
                spiral="rectangular"
                rotate={0}
                random={() => 0.5}
            >
              {(palavrasNuvem) =>
                  palavrasNuvem.map((p, i) => {
                    const palavraOriginal = wordCloud.find(termo => termo.term === p.text);
                    return (
                        <Text
                            key={`${p.text ?? ''}-${i}`}

                            fill={obterCorSentimento(palavraOriginal?.sentiment)}
                            textAnchor="middle"
                            transform={`translate(${p.x}, ${p.y}) rotate(${p.rotate})`}
                            fontSize={p.size}
                            fontFamily={p.font}
                        >
                          {p.text}
                        </Text>
                    );
                  })
              }
            </Wordcloud>
          </div>
        </div>
      </div>
  );
};

export default Topics;
