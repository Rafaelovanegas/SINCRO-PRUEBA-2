
import React from 'react';
import { ToolType } from './types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ToolType;
  setActiveTab: (tab: ToolType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: ToolType.DASHBOARD, label: 'Inicio', icon: '🏠' },
    { id: ToolType.LIVE, label: 'Live Talk', icon: '🎙️' },
    { id: ToolType.IMAGE, label: 'Editor', icon: '🎨' },
    { id: ToolType.TEXT, label: 'AI Chat', icon: '✍️' },
    { id: ToolType.AUDIO, label: 'Voz', icon: '🔊' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <nav className="hidden md:flex w-64 bg-white border-r border-slate-200 p-4 sticky top-0 h-screen flex-col">
        <h1 className="text-xl font-bold text-indigo-600 mb-8">✨ Gemini Studio</h1>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{item.icon}</span> <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full overflow-y-auto">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-2 flex justify-around z-50">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center p-2 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
