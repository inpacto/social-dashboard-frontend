'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Overview from '@/components/Overview';
import TopPosts from '@/components/TopPosts';
import NewsFeed from '@/components/NewsFeed';
import Topics from '@/components/Topics';
import Audience from '@/components/Audience';
import RealTime from '@/components/RealTime';
import Authors from '@/components/Authors';
import Mentions from "@/components/Mentions";

const API_BASE_URL = 'http://localhost:5000/api';

export default function Home() {
  const [visualizacaoAtual, setVisualizacaoAtual] = useState(0);
  const [dados, setDados] = useState<any>({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const visualizacoes = [
    { nome: 'Visão Geral', componente: <Overview data={dados.overview} hourlyData={dados.mentionsHourly} /> },
    { nome: 'Top Posts', componente: <TopPosts posts={dados.posts} /> },
    { nome: 'Notícias', componente: <NewsFeed news={dados.news} /> },
    { nome: 'Menções', componente: <Mentions mainTopics={dados.mainTopics} /> },
    { nome: 'Tópicos', componente: <Topics hashtags={dados.hashtags} wordCloud={dados.wordCloud} /> },
    { nome: 'Audiência', componente: <Audience dataSources={dados.dataSources} regions={dados.regions} topAuthors={dados.topAuthors} topSites={dados.topSites} /> },
    { nome: 'Autores', componente: <Authors dataSources={dados.dataSources} regions={dados.regions} topAuthors={dados.topAuthors} topSites={dados.topSites} /> },
    { nome: 'Tempo Real', componente: <RealTime topics={dados.realTimeTopics} /> },
  ];

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const [
          overviewRes,
          hourlyRes,
          postsRes,
          newsRes,
          hashtagsRes,
          wordCloudRes,
          mainTopicsRes,
          dataSourcesRes,
          regionsRes,
          topAuthorsRes,
          topSitesRes,
          realTimeTopicsRes
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/mentions-overview`),
          axios.get(`${API_BASE_URL}/mentions-hourly`),
          axios.get(`${API_BASE_URL}/posts`),
          axios.get(`${API_BASE_URL}/news`),
          axios.get(`${API_BASE_URL}/hashtags`),
          axios.get(`${API_BASE_URL}/word-cloud-terms`),
          axios.get(`${API_BASE_URL}/main-topics`),
          axios.get(`${API_BASE_URL}/data-sources`),
          axios.get(`${API_BASE_URL}/regions`),
          axios.get(`${API_BASE_URL}/top-authors`),
          axios.get(`${API_BASE_URL}/top-sites`),
          axios.get(`${API_BASE_URL}/real-time-topics`),
        ]);

        setDados({
          overview: overviewRes.data[0],
          mentionsHourly: hourlyRes.data,
          posts: postsRes.data,
          news: newsRes.data,
          hashtags: hashtagsRes.data,
          wordCloud: wordCloudRes.data,
          mainTopics: mainTopicsRes.data,
          dataSources: dataSourcesRes.data,
          regions: regionsRes.data,
          topAuthors: topAuthorsRes.data,
          topSites: topSitesRes.data,
          realTimeTopics: realTimeTopicsRes.data,
        });
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        setErro('Falha ao carregar os dados do dashboard.');
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const proximaVisualizacao = () => {
    setVisualizacaoAtual((anterior) => (anterior + 1) % visualizacoes.length);
  };

  const visualizacaoAnterior = () => {
    setVisualizacaoAtual((anterior) => (anterior - 1 + visualizacoes.length) % visualizacoes.length);
  };

  return (
      <main className="flex min-h-screen flex-col bg-gray-900">
        <Header
            title="Ministério da Justiça"
            currentViewIndex={visualizacaoAtual}
            totalViews={visualizacoes.length}
            viewName={visualizacoes[visualizacaoAtual].nome}
            onNext={proximaVisualizacao}
            onPrev={visualizacaoAnterior}
        />

        <div className="flex-grow p-4 mt-4">
          {carregando ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl">Carregando dados...</p>
              </div>
          ) : erro ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl text-red-500">{erro}</p>
              </div>
          ) : (
              visualizacoes[visualizacaoAtual].componente
          )}
        </div>
      </main>
  );
}
