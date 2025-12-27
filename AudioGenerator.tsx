
import React, { useState } from 'react';
import { generateSpeech, decode, decodeAudioData } from './geminiService';

const AudioGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    setLoading(true);
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const base64 = await generateSpeech(text);
      const buffer = await decodeAudioData(decode(base64), ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (e) { alert("Error al generar audio."); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Texto a Voz</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="¿Qué quieres que diga la IA?" className="w-full h-32 p-4 bg-slate-50 border rounded-2xl mb-4 resize-none" />
      <button onClick={handlePlay} disabled={loading || !text} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold disabled:opacity-50">
        {loading ? 'Generando audio...' : '🔊 Reproducir Audio'}
      </button>
    </div>
  );
};

export default AudioGenerator;
