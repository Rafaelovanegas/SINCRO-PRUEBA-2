
import React, { useState, useRef } from 'react';
import { editImageWithPrompt } from './geminiService';

const ImageEditor: React.FC = () => {
  const [source, setSource] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = async () => {
    if (!source || !prompt) return;
    setLoading(true);
    try {
      const base64 = source.split(',')[1];
      const edited = await editImageWithPrompt(base64, prompt);
      setResult(edited);
    } catch (err) {
      alert("Error al editar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Editor de Imágenes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden">
            {source ? <img src={source} className="w-full h-full object-cover" /> : <p className="text-slate-400">Sube una foto</p>}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setSource(reader.result as string);
              reader.readAsDataURL(file);
            }
          }} />
          <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">📂 Seleccionar Foto</button>
        </div>
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border flex items-center justify-center overflow-hidden">
            {loading ? <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div> : 
             result ? <img src={result} className="w-full h-full object-cover" /> : <p className="text-slate-400 italic">Resultado aquí</p>}
          </div>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ej: Hazlo estilo pintura al óleo..." className="w-full p-4 border rounded-xl" />
          <button disabled={!source || !prompt || loading} onClick={handleEdit} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold disabled:opacity-50">✨ Aplicar Magia</button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
