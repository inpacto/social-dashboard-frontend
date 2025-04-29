import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Square } from 'lucide-react';

interface HeaderProps {
  title: string;
  currentViewIndex: number;
  totalViews: number;
  viewName: string;
  onPrev: () => void;
  onNext: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, currentViewIndex, totalViews, viewName, onPrev, onNext }) => {
  return (
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md relative">
        <div className="flex items-center">
          <div className="p-2 rounded mr-3">
            <img src="/assets/logo-sta.png" alt="Logo STA" className="w-12 h-12 object-contain filter brightness-0 invert" />
          </div>

          <div className="flex items-center">
            <img src="/assets/ministerio-justica.png" alt="Logo Ministério" className="h-12 object-contain" />
          </div>
          { /* <h1 className="text-xl font-semibold text-white">{title}</h1>*/ }
        </div>


        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          <button
              onClick={() => {} }
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
              disabled={currentViewIndex === 0}
          >
            <ChevronsLeft size={20} />
          </button>
          <button
              onClick={onPrev}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
              disabled={currentViewIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-sm text-gray-300 px-3 py-1 bg-gray-700 rounded">
            {viewName} <span className="text-gray-500">{currentViewIndex + 1}/{totalViews}</span>
          </div>

          <button
              onClick={onNext}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
              disabled={currentViewIndex === totalViews - 1}
          >
            <ChevronRight size={20} />
          </button>
          <button
              onClick={() => {}}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
              disabled={currentViewIndex === totalViews - 1}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
  );
};

export default Header;
