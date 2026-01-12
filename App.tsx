
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { MOOD_DATA } from './data';
import { MoodCategory, Feeling, IntensityLevel, MoodEntry } from './types';

const Icon = ({ name, className }: { name: string, className?: string }) => {
  const LucideIcon = (Lucide as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : <Lucide.Circle className={className} />;
};

const getCategoryColor = (id: string) => {
  switch (id) {
    case 'angst': return 'rose';
    case 'freude': return 'amber';
    case 'traurigkeit': return 'blue';
    case 'wut': return 'orange';
    case 'scham': return 'fuchsia';
    case 'ohnmacht-cat': return 'cyan';
    case 'misstrauen-cat': return 'slate';
    case 'ekel-cat': return 'lime';
    case 'widerwille-cat': return 'emerald';
    case 'hypervigilanz-cat': return 'sky';
    default: return 'indigo';
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'feeling' | 'intensity' | 'summary' | 'history' | 'ai-analysis'>('home');
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<IntensityLevel | null>(null);
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [note, setNote] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{short: string, transcription: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mood_history');
    if (saved) try { setHistory(JSON.parse(saved)); } catch (e) {}
  }, []);

  const handleSave = () => {
    if (!selectedCategory || !selectedFeeling || !selectedIntensity) return;
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      feelingId: selectedFeeling.id,
      feelingName: selectedFeeling.name,
      intensity: selectedIntensity.max,
      quote: selectedIntensity.quote,
      label: selectedIntensity.label,
      description: selectedIntensity.description,
      recommendation: selectedIntensity.recommendation,
      note: note
    };

    const updated = [newEntry, ...history];
    setHistory(updated);
    localStorage.setItem('mood_history', JSON.stringify(updated));
    reset();
  };

  const reset = () => {
    setSelectedCategory(null);
    setSelectedFeeling(null);
    setSelectedIntensity(null);
    setNote('');
    setView('home');
  };

  const renderIntensityView = () => (
    <div className="flex flex-col gap-4 pb-20 animate-in slide-in-from-right">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setView('feeling')} className="p-2 -ml-2 text-slate-400"><Lucide.ArrowLeft size={20} /></button>
        <h2 className="text-lg font-bold">Wie intensiv ist "{selectedFeeling?.name}"?</h2>
      </div>
      
      <div className="space-y-3">
        {selectedFeeling?.intensities.map((level, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedIntensity(level); setView('summary'); }}
            className={`w-full p-4 rounded-2xl text-left border transition-all ${
              selectedIntensity === level 
                ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">{level.min}-{level.max}%</span>
              {level.icon && <Icon name={level.icon === 'warning' ? 'AlertTriangle' : 'Zap'} className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="font-bold text-sm mb-1">{level.label}</p>
            <p className="text-xs italic opacity-70">"{level.quote}"</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b1120]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3" onClick={reset}>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Lucide.Activity size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none">lübbenTRAK</h1>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-indigo-400">Pro Edition</span>
          </div>
        </div>
        <button onClick={() => setView('history')} className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors">
          <Lucide.History size={20} />
        </button>
      </header>

      <main className="max-w-md mx-auto p-6">
        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-1">Was fühlst du gerade?</h2>
              <div className="grid grid-cols-2 gap-4">
                {MOOD_DATA.filter(m => !m.isSecondary).map(cat => {
                  const color = getCategoryColor(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat); setView('feeling'); }}
                      className="group relative overflow-hidden p-6 rounded-3xl bg-slate-800/40 border border-white/5 hover:border-indigo-500/50 transition-all active:scale-95"
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-3xl -z-10 group-hover:bg-${color}-500/20 transition-colors`} />
                      <Icon name={cat.icon} className={`w-8 h-8 mb-4 text-indigo-400 group-hover:scale-110 transition-transform`} />
                      <span className="block font-black text-xs uppercase tracking-wider">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 text-center relative overflow-hidden group">
              <div className="relative z-10">
                <Lucide.Mic size={32} className="mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-base mb-2">Sprachanalyse</h3>
                <p className="text-xs text-slate-400 mb-6 px-4 leading-relaxed">Beschreibe deine Stimmung mit eigenen Worten. Unsere KI hilft dir bei der Einordnung.</p>
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95">
                  Aufnahme starten
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-1">Weitere Gefühle</h2>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
                {MOOD_DATA.filter(m => m.isSecondary).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat); setView('feeling'); }}
                    className="flex-shrink-0 px-6 py-4 rounded-2xl bg-slate-800/40 border border-white/5 text-[10px] font-black uppercase tracking-wider hover:border-indigo-500/30"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'feeling' && selectedCategory && (
          <div className="animate-in slide-in-from-right">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setView('home')} className="p-2 -ml-2 text-slate-400"><Lucide.ArrowLeft size={20} /></button>
              <h2 className="text-lg font-bold">Wähle dein Feingefühl</h2>
            </div>
            <div className="grid gap-3">
              {selectedCategory.feelings.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setSelectedFeeling(f); setView('intensity'); }}
                  className="p-5 rounded-2xl bg-slate-800/60 border border-white/5 text-left flex justify-between items-center group hover:border-indigo-500/50"
                >
                  <div>
                    <span className="block font-bold text-sm mb-1">{f.name}</span>
                    {f.composition && <span className="text-[9px] text-slate-500 uppercase tracking-tighter">{f.composition}</span>}
                  </div>
                  <Lucide.ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'intensity' && renderIntensityView()}

        {view === 'summary' && selectedIntensity && (
          <div className="animate-in slide-in-from-bottom-8 space-y-6 pb-24">
             <div className="p-8 rounded-[2.5rem] bg-slate-800/50 border border-white/5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl" />
                <h3 className="relative text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Zusammenfassung</h3>
                <div className="relative mb-6">
                  <div className="text-5xl font-black text-white mb-2">{selectedIntensity.max}%</div>
                  <div className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{selectedIntensity.label}</div>
                </div>
                <p className="relative text-sm italic text-slate-300 leading-relaxed mb-8 px-4">"{selectedIntensity.quote}"</p>
                
                <textarea
                  placeholder="Eigene Notiz hinzufügen..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#0b1120] border border-white/10 text-xs focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] resize-none"
                />
             </div>

             <div className="grid gap-4">
               {selectedIntensity.recommendation && (
                 <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4">
                    <Lucide.CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <div className="text-xs">
                      <p className="font-black uppercase tracking-widest text-emerald-500 mb-1">Empfehlung</p>
                      <p className="text-slate-300 leading-relaxed">{selectedIntensity.recommendation}</p>
                    </div>
                 </div>
               )}
               <button 
                onClick={handleSave}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
               >
                Eintrag speichern
               </button>
               <button onClick={reset} className="w-full py-4 text-slate-500 font-bold text-xs uppercase">Abbrechen</button>
             </div>
          </div>
        )}

        {view === 'history' && (
          <div className="animate-in slide-in-from-left space-y-4 pb-20">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setView('home')} className="p-2 -ml-2 text-slate-400"><Lucide.ArrowLeft size={20} /></button>
              <h2 className="text-lg font-bold">Dein Verlauf</h2>
            </div>
            {history.length === 0 ? (
              <div className="text-center py-20 text-slate-500">Noch keine Einträge vorhanden.</div>
            ) : (
              history.map(entry => (
                <div key={entry.id} className="p-5 rounded-3xl bg-slate-800/40 border border-white/5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{new Date(entry.timestamp).toLocaleDateString()}</span>
                      <h4 className="font-bold text-sm">{entry.feelingName}</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black">{entry.intensity}%</span>
                  </div>
                  <p className="text-[11px] italic text-slate-400 leading-relaxed">"{entry.quote}"</p>
                  {entry.note && (
                    <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300 opacity-80">{entry.note}</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Persistent Audio Trigger (Floating) */}
      {view === 'home' && (
        <div className="fixed bottom-8 right-6">
          <button className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/50 border border-white/20 active:scale-90 transition-all">
            <Lucide.Mic size={24} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
