import React from 'react';
import { Twitter, Instagram, Facebook, MessageCircle } from 'lucide-react';

interface Post {
  id: number;
  platform: string;
  author_name: string;
  author_handle: string;
  author_avatar_url?: string;
  content: string;
  timestamp: string;
  impact_score?: number;
  media_url?: string;
}

interface TopPostsProps {
  posts: Post[];
}

const IconePlataforma = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return <Twitter size={16} className="text-blue-400" />;
    case 'instagram':
      return <Instagram size={16} className="text-pink-500" />;
    case 'facebook':
      return <Facebook size={16} className="text-blue-600" />;
    default:
      return <MessageCircle size={16} className="text-gray-400" />;
  }
};

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

const CartaoPost: React.FC<{ post: Post }> = ({ post }) => {
  return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center mb-2">
          {post.author_avatar_url ? (
              <img src={post.author_avatar_url} alt={post.author_name} className="w-8 h-8 rounded-full mr-2" />
          ) : (
              <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 flex items-center justify-center text-white text-xs">
                {post.author_name.substring(0, 1)}
              </div>
          )}
          <div>
            <p className="text-sm font-semibold text-white">{post.author_name}</p>
            <p className="text-xs text-gray-400">{post.author_handle}</p>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-3 whitespace-pre-wrap break-words">{post.content}</p>

        {/*
          {post.media_url && (
              <img
                  src={post.media_url}
                  alt="Mídia do post"
                  className="rounded-lg mb-3 w-full object-cover"
                  style={{ maxHeight: '200px' }}
              />
          )}
        */}

        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <IconePlataforma platform={post.platform} />
            <span className="ml-1">{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</span>
            <span className="mx-1">•</span>
            <span>{tempoDecorrido(post.timestamp)}</span>
          </div>
          {post.impact_score && (
              <span className="font-medium">Impacto: {post.impact_score}</span>
          )}
        </div>
      </div>
  );
};

const TopPosts: React.FC<TopPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div className="text-center p-10">Carregando posts...</div>;
  }

  const postsTwitter = posts.filter(p => p.platform === 'twitter');
  const postsInstagram = posts.filter(p => p.platform === 'instagram');
  const postsFacebook = posts.filter(p => p.platform === 'facebook');

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-lg font-semibold text-white">Twitter</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          {postsTwitter.length > 0 ? (
              postsTwitter.map(post => <CartaoPost key={post.id} post={post} />)
          ) : (
              <p className="text-gray-500 text-center py-5">Nenhum post do Twitter.</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-lg font-semibold text-white">Instagram</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          {postsInstagram.length > 0 ? (
              postsInstagram.map(post => <CartaoPost key={post.id} post={post} />)
          ) : (
              <p className="text-gray-500 text-center py-5">Nenhum post do Instagram.</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-lg font-semibold text-white">Facebook</h2>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          {postsFacebook.length > 0 ? (
              postsFacebook.map(post => <CartaoPost key={post.id} post={post} />)
          ) : (
              <p className="text-gray-500 text-center py-5">Nenhum post do Facebook.</p>
          )}
        </div>
      </div>
  );
};

export default TopPosts;
