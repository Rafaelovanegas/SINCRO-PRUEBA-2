
import React from 'react';
import { ToolType } from './types';

interface DashboardProps {
  onNavigate: (tab: ToolType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const tools = [
    { id: ToolType.LIVE, title: 'Voz en Vivo', icon: '🎙️', color: 'bg-emerald-50 text-emerald-600' },
    { id: ToolType.IMAGE, title: 'Editor IA', icon: '🎨', color: 'bg-blue-50 text-blue-600' },
    { id: ToolType.TEXT, title: 'Asistente', icon: '✍️', color: 'bg-purple-50 text-purple-600' },
    { id: ToolType.AUDIO, title: 'Voz Pro', icon: '🔊', color: 'bg-amber-50 text-amber-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl">
        <h1 className="text-4xl font-extrabold mb-2">¡Hola, Creador!</h1>
        <p className="opacity-80 mb-6">Tu estudio de IA está listo.</p>
        <button onClick={() => onNavigate(ToolType.LIVE)} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold">🎙️ Hablar ahora</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button key={tool.id} onClick={() => onNavigate(tool.id)} className="p-6 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm text-left active:scale-95 transition-all">
            <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center text-2xl mb-4`}>{tool.icon}</div>
            <h3 className="font-bold text-slate-800">{tool.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
