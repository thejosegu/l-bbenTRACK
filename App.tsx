
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { MOOD_DATA } from './data';
import { MoodCategory, Feeling, IntensityLevel, MoodEntry } from './types';

// Helper for Lucide icons
const Icon = ({ name, className }: { name: string, className?: string }) => {
  const LucideIcon = (Lucide as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : <Lucide.Circle className={className} />;
};

const getCategoryIconColor = (id: string, theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  switch (id) {
    case 'angst': return isDark ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50';
    case 'freude': return isDark ? 'text-amber-400 bg-amber-500/10' : 'text-amber-600 bg-amber-50';
    case 'traurigkeit': return isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50';
    case 'wut': return isDark ? 'text-slate-200 bg-slate-700' : 'text-slate-800 bg-slate-100';
    case 'scham': return isDark ? 'text-rose-400 bg-rose-500/10' : 'text-rose-600 bg-rose-50';
    case 'ohnmacht-cat': return isDark ? 'text-sky-400 bg-sky-500/10' : 'text-sky-600 bg-sky-50';
    case 'misstrauen-cat': return isDark ? 'text-orange-400 bg-orange-500/10' : 'text-orange-600 bg-orange-50';
    case 'ekel-cat': return isDark ? 'text-lime-400 bg-lime-500/10' : 'text-lime-600 bg-lime-50';
    case 'widerwille-cat': return isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-600/10';
    case 'hypervigilanz-cat': return isDark ? 'text-cyan-400 bg-cyan-500/10' : 'text-cyan-600 bg-cyan-50';
    default: return isDark ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50';
  }
};

const getIntensityColor = (percent: number) => {
  if (percent <= 30) return 'bg-blue-500';
  if (percent <= 50) return 'bg-emerald-500';
  if (percent <= 65) return 'bg-amber-500';
  if (percent <= 80) return 'bg-orange-600';
  return 'bg-red-600';
};

const getIntensityTextClass = (percent: number, isDark: boolean) => {
  if (percent <= 30) return isDark ? 'text-blue-400' : 'text-blue-600';
  if (percent <= 50) return isDark ? 'text-emerald-400' : 'text-emerald-600';
  if (percent <= 65) return isDark ? 'text-amber-400' : 'text-amber-600';
  if (percent <= 80) return isDark ? 'text-orange-400' : 'text-orange-600';
  return isDark ? 'text-red-400' : 'text-red-600';
};

const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const weekday = date.toLocaleDateString('de-DE', { weekday: 'long' });
  const ddmmyyyy = date.toLocaleDateString('de-DE');
  const hhmm = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return `${weekday}, ${ddmmyyyy}, ${hhmm}`;
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

interface AIAnalysisResult {
  short: string;
  medium: string;
  long: string;
  transcription: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'feeling' | 'intensity' | 'summary' | 'settings' | 'history' | 'pro-feature'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);
  const [selectedIntensityIndex, setSelectedIntensityIndex] = useState<number>(-1);
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [enabledFeelingIds, setEnabledFeelingIds] = useState<string[]>([]);
  const [favoriteFeelingIds, setFavoriteFeelingIds] = useState<string[]>(['anspannung', 'freude-basis', 'hyper-over']);
  const [note, setNote] = useState('');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResults, setAiResults] = useState<AIAnalysisResult | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [showFeelingInfo, setShowFeelingInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedIntensity = useMemo(() => {
    if (!selectedFeeling || selectedIntensityIndex === -1) return null;
    return selectedFeeling.intensities[selectedIntensityIndex];
  }, [selectedFeeling, selectedIntensityIndex]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('mood_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
    const savedSettings = localStorage.getItem('mood_settings');
    if (savedSettings) {
      try { setEnabledFeelingIds(JSON.parse(savedSettings)); } catch (e) { console.error(e); }
    } else {
      setEnabledFeelingIds(['anspannung', 'freude-basis', 'hyper-over', 'wut-basis']);
    }
    const savedTheme = localStorage.getItem('mood_theme');
    if (savedTheme) setTheme(savedTheme as any);
  }, []);

  const changeTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('mood_theme', newTheme);
  };

  const saveToHistory = (entry: MoodEntry) => {
    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem('mood_history', JSON.stringify(updated));
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedFeeling(null);
    setSelectedIntensityIndex(-1);
    setNote('');
    setAiResults(null);
    setView('home');
    setIsMenuOpen(false);
  };

  const processAudioWithGemini = async (audioBlob: Blob) => {
    if (!process.env.API_KEY) {
      alert("API Key fehlt!");
      setIsProcessing(false);
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Audio = await blobToBase64(audioBlob);
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: {
          parts: [
            { inlineData: { mimeType: audioBlob.type || 'audio/webm', data: base64Audio } },
            { text: "Analysiere die Aufnahme. JSON: short, medium, long, transcription." }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              short: { type: Type.STRING },
              medium: { type: Type.STRING },
              long: { type: Type.STRING },
              transcription: { type: Type.STRING }
            },
            required: ['short', 'medium', 'long', 'transcription']
          }
        }
      });
      setAiResults(JSON.parse(response.text || "{}"));
      setView('pro-feature');
    } catch (error) {
      alert("KI-Verarbeitung fehlgeschlagen.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsProcessing(true);
        processAudioWithGemini(audioBlob);
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) { alert("Mikrofon-Zugriff verweigert."); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const renderProFeature = () => {
    const shortText = aiResults?.short || "Der Sprecher testet eine Sprachnachrichtenfunktion und drückt seine Freude über deren Existenz und Integration aus.";
    const mediumText = aiResults?.medium || "Der Sprecher führt einen Test durch und äußert seine Zufriedenheit mit der Sprachnachrichtenfunktion. Er freut sich über die App und die Integration dieser Funktion. Abschließend bedankt er sich und wünscht viel Spaß bei der Nutzung.";
    const transText = aiResults?.transcription || "1 2 3 4 5, dies ist ein Test. Ich weiß nicht, wie die Interpretation dieser Sprachnachricht erfolgen wird...";

    return (
      <div className="flex flex-col min-h-full bg-[#0b1120] text-slate-100 p-6 animate-in fade-in pb-20">
        <div className="flex flex-col items-center justify-center py-10 px-4 mb-8 border-2 border-dashed border-indigo-500/20 rounded-3xl bg-indigo-500/5">
           <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <Lucide.Mic size={24} className="animate-pulse" />
              <h2 className="text-xl font-black">Dies ist deine Aufnahme.</h2>
           </div>
           <div className="bg-[#1e293b]/40 p-4 rounded-xl border border-slate-700/30 mb-6 w-full text-center">
             <h4 className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-2">Transkription (Beispiel)</h4>
             <p className="text-[10px] italic opacity-60">"{transText}"</p>
           </div>
           <p className="text-xs font-medium text-center text-slate-400">
             In der Pro-Version kannst du deine Stimmung mittels KI zusammenfassen.
           </p>
        </div>

        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">KI-ZUSAMMENFASSUNG</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-[#1e293b] border border-slate-700/50 p-5 rounded-2xl flex justify-between">
            <div className="flex-1"><h4 className="text-[10px] font-black text-indigo-400 mb-2">A. KURZ</h4><p className="text-sm italic opacity-60">"{shortText}"</p></div>
            <Lucide.Lock size={16} className="text-slate-600 ml-2" />
          </div>
          <div className="bg-[#1e293b] border border-slate-700/50 p-5 rounded-2xl flex justify-between">
            <div className="flex-1"><h4 className="text-[10px] font-black text-indigo-400 mb-2">B. MITTEL</h4><p className="text-sm italic opacity-60">"{mediumText}"</p></div>
            <Lucide.Lock size={16} className="text-slate-600 ml-2" />
          </div>
        </div>

        <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black text-[11px] uppercase shadow-lg mb-8">
           Upgrade auf lübbenTRAK Pro
        </button>

        <div className="flex gap-4 p-4 rounded-2xl bg-amber-900/20 border border-amber-900/30">
             <Lucide.AlertCircle className="text-amber-500 shrink-0" size={18} />
             <p className="text-[10px] font-black text-amber-500 uppercase">Speichern in der Test-Version nicht möglich.</p>
        </div>
        
        <button onClick={() => setView('home')} className="w-full mt-6 py-4 rounded-xl bg-slate-800 text-white font-black text-[10px] uppercase">Zurück</button>
      </div>
    );
  };

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#0b1120] text-slate-100' : 'bg-slate-50 text-slate-900';
  const Branding = () => (
    <div className="flex items-center gap-3 cursor-pointer" onClick={resetSelection}>
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl">L</div>
      <div className="flex flex-col"><h1 className="text-xl font-black tracking-tighter leading-none">lübbenTRAK</h1><span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">PRO VERSION 0.3.5</span></div>
    </div>
  );

  return (
    <div className={`max-w-md mx-auto min-h-screen flex flex-col ${bgClass}`}>
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center bg-inherit">
        <Branding />
        <button onClick={() => setView('pro-feature')} className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400"><Lucide.Zap size={20} /></button>
      </nav>
      <main className="flex-1 p-4">
        {view === 'home' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Gefühle</h2>
            <div className="grid grid-cols-2 gap-3">
              {MOOD_DATA.filter(m => !m.isSecondary).map(cat => (
                <button key={cat.id} onClick={() => { setSelectedCategory(cat); setView('feeling'); }} className="flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-[#1e293b] hover:border-indigo-500/50">
                  <Icon name={cat.icon} className="w-8 h-8 mb-3 text-indigo-400" />
                  <span className="font-black text-[10px] uppercase tracking-wider">{cat.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 text-center">
               <Lucide.Mic size={32} className="mx-auto mb-4 text-indigo-400" />
               <p className="text-sm font-bold mb-4">Sprachnotiz analysieren?</p>
               <button onClick={isRecording ? stopRecording : startRecording} className={`w-full py-3 rounded-xl font-black text-[10px] uppercase ${isRecording ? 'bg-red-500' : 'bg-indigo-600'} text-white`}>
                 {isRecording ? 'Aufnahme stoppen' : 'Jetzt aufnehmen'}
               </button>
            </div>
          </div>
        )}
        {view === 'pro-feature' && renderProFeature()}
        {view === 'feeling' && (
           <div className="animate-in slide-in-from-bottom-4">
             <button onClick={() => setView('home')} className="mb-4 text-xs font-bold flex items-center gap-1 text-slate-500"><Lucide.ArrowLeft size={14} /> Zurück</button>
             <div className="flex flex-col gap-2">
               {selectedCategory?.feelings.map(f => (
                 <button key={f.id} onClick={() => { setSelectedFeeling(f); setView('pro-feature'); }} className="p-4 rounded-xl border border-slate-800 bg-[#1e293b] text-left flex justify-between items-center">
                   <span className="font-bold">{f.name}</span>
                   <Lucide.ChevronRight size={16} />
                 </button>
               ))}
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;
