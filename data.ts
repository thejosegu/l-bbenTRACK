
import { MoodCategory, IntensityLevel } from './types';

// --- BESTEHENDE SKALA (Referenz) ---
// Die 14-stufige Skala basierend auf dem Anspannungs-Modell
const distressScale: IntensityLevel[] = [
  { 
    min: 0, max: 10, 
    label: 'Dissoziation / Emotionale Erstarrung', 
    quote: 'Ich fühle gar nichts; alles ist grau und weit weg',
    description: 'Völlig abgeschnitten, leer, kein Gefühl; kritische Untererregung'
  },
  { 
    min: 10, max: 20, 
    label: 'Tiefe Untererregung', 
    quote: 'Ich kann mich zu nichts aufraffen; mir ist alles egal',
    description: 'Sehr wenig Antrieb, apathisch, hoffnungslos',
    recommendation: 'Sanfte Aktivierung: Bewegung, Musik'
  },
  { 
    min: 20, max: 30, 
    label: 'Untererregung / Milde Depression', 
    quote: 'Mir fehlt die Kraft; ich bin völlig erschöpft',
    description: 'Müde, wenig Energie, aber noch erreichbar',
    recommendation: 'Leichte Stimulation suchen'
  },
  { 
    min: 30, max: 35, 
    label: 'Leicht erhöhte Anspannung', 
    quote: 'Das nervt mich, aber ich kann damit umgehen',
    description: 'Unangenehm, aber beherrschbar',
    recommendation: 'Achtsamkeit, kurze Pause'
  },
  { 
    min: 35, max: 40, 
    label: 'Leichte Anspannung – unterer Normbereich', 
    quote: 'Ich bin angespannt, aber es geht mir noch okay',
    description: 'Erste Anzeichen von Druck; noch kontrollierbar',
    recommendation: 'Dehnübungen, Atemtechniken'
  },
  { 
    min: 40, max: 45, 
    label: 'Moderate Anspannung – Normbereich', 
    quote: 'Ich bin nervös, aber ich kriege meine Aufgaben noch hin',
    description: 'Deutlich spürbar, aber funktionsfähig',
    recommendation: 'Strukturierte Bewältigung'
  },
  { 
    min: 45, max: 50, 
    label: 'Steigende Anspannung – oberer Normbereich', 
    quote: 'Das wird zu viel; ich muss was machen',
    description: 'Unangenehm und belastend',
    recommendation: 'Aktive Strategien: Progressive Muskelentspannung'
  },
  { 
    min: 50, max: 55, 
    label: 'WENDEPUNKT – Hohe Anspannung', 
    quote: 'Ich bin sehr angespannt – das ist meine Grenze', 
    description: 'Grenzfall: noch auszuhalten, aber kritisch',
    recommendation: 'Intensive Coping jetzt erforderlich',
    icon: 'warning' 
  },
  { 
    min: 55, max: 60, 
    label: 'Sehr hohe Anspannung – Warnbereich', 
    quote: 'Ich halte das kaum aus; ich brauche Hilfe', 
    description: 'Schmerzhaft, Denken läuft im Kreis',
    recommendation: 'Notfallplan nutzen, Unterstützung suchen',
    icon: 'warning' 
  },
  { 
    min: 60, max: 65, 
    label: 'Kritische Anspannung – Übergangsbereich', 
    quote: 'Mir geht es wirklich schlecht; ich kann nicht mehr klar denken', 
    description: 'Alltag massiv beeinträchtigt, Kontrollverlust droht',
    recommendation: 'Sofort Therapeut / Vertrauensperson kontaktieren',
    icon: 'bolt' 
  },
  { 
    min: 65, max: 70, 
    label: 'Extreme Anspannung – Krisenrand', 
    quote: 'Das ist unerträglich; ich fürchte, zusammenzubrechen', 
    description: 'Panik und Verzweiflung; unmittelbare Gefahr des Zusammenbruchs',
    recommendation: 'Notfall-Intervention einleiten',
    icon: 'bolt' 
  },
  { 
    min: 70, max: 80, 
    label: 'KRISE – Akute Überregung', 
    quote: 'Ich verliere die Kontrolle; mir ist Angst und Bange', 
    description: 'Kontrollverlust, Panik, dissoziative Momente möglich',
    recommendation: 'Professionelle Hilfe JETZT anfordern',
    icon: 'bolt' 
  },
  { 
    min: 80, max: 90, 
    label: 'NOTFALL – Extreme Krise', 
    quote: 'Das ist das Schlimmste, das ich je gefühlt habe', 
    description: 'Äußerstes Unbehagen, chaotische Gedanken; Gefahr von Selbstverletzung',
    recommendation: 'Notarzt / Krisentelefon anrufen',
    icon: 'bolt' 
  },
  { 
    min: 90, max: 100, 
    label: 'AKUTER NOTFALL', 
    quote: 'Ich kann nicht mehr; ich brauche sofort Hilfe', 
    description: 'Vollständiger Zusammenbruch; unmittelbare Sicherheitsgefährdung',
    recommendation: 'Sofort Emergency-Services (Notruf 112) wählen',
    icon: 'bolt' 
  }
];

// --- NEUE SKALEN AUS CSV ---

const hypervigilanzScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Mir geht es gut; ich bin ruhig und präsent', label: 'Entspannt / Normal wach', description: 'Natürliche, angepasste Wachsamkeit; entspannt und präsent.' },
  { min: 10, max: 20, quote: 'Ich bin normal aufmerksam; alles ist in Ordnung', label: 'Leicht erhöhte Aufmerksamkeit', description: 'Normale Vorsicht, minimal angespannt; kaum bemerkbar (alltäglich).' },
  { min: 20, max: 30, quote: 'Ich bin etwas aufmerksam, aber entspannt', label: 'Milde Überempfindlichkeit', description: 'Leicht gesteigertes Bewusstsein für Umgebung.', recommendation: 'Noch entspannt (kurze Pausen, Erdbewusstsein)' },
  { min: 30, max: 35, quote: 'Ich bin angespannt und achte auf alles, aber das geht mir noch', label: 'Leichte Hypervigilanz – unterer Normbereich', description: 'Erhöhte Aufmerksamkeit für mögliche Gefahren; aber kontrollierbar.', recommendation: 'Grounding, Bewegung' },
  { min: 35, max: 40, quote: 'Ich bin ständig auf der Hut; jedes Geräusch lässt mich zusammenzucken', label: 'Mäßige Hypervigilanz', description: 'Ständiges Scannen der Umgebung, schnelle Schreckreaktion; funktionsfähig.', recommendation: 'Strukturierte Aktivität' },
  { min: 40, max: 45, quote: 'Ich kann mich nicht entspannen; ich muss ständig alles beobachten', label: 'Moderate Hypervigilanz – Normbereich', description: 'Intensives Umweltmonitoring, Konzentrationsprobleme; alltäglich belastend.', recommendation: 'Achtsamkeit, Sicherheit herstellen' },
  { min: 45, max: 50, quote: 'Das ist anstrengend; ich bin völlig versteift', label: 'Steigende Hypervigilanz – oberer Normbereich', description: 'Extreme Angespanntheit, Muskelanspannung überall, Schlafstörungen.', recommendation: 'Intensive Strategien nötig (PMR)' },
  { min: 50, max: 55, quote: 'Ich kann einfach nicht abschalten; überall lauern Gefahren', label: 'WENDEPUNKT – Hohe Hypervigilanz', description: 'Permanente Alarmbereitschaft; Gedanken kreisen um Bedrohungen.', recommendation: 'Intensive Intervention nötig (externe Sicherheit, Co-Regulation)', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich bin am Ende meiner Kraft; alles macht mir Angst', label: 'Sehr hohe Hypervigilanz – Warnbereich', description: 'Extreme Anspannung, Überreaktionen auf Reize; funktional deutlich beeinträchtigt.', recommendation: 'Unterstützung, Therapeut', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich vertraue niemanden; überall lauern Feinde', label: 'Kritische Hypervigilanz – Übergangsbereich', description: 'Paranoide Gedanken möglich, massive Angstreaktion auf neutrale Reize.', recommendation: 'Sofort Hilfe suchen', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich kann nicht mehr; der Schmerz ist unerträglich', label: 'Extreme Hypervigilanz – Krisenrand', description: 'Fast völlig in Angst erstarrt, kann Umgebung nicht mehr realistisch einschätzen.', recommendation: 'Unmittelbare Notfall-Intervention', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Das ist real – das Trauma passiert wieder', label: 'KRISE – Akute Überreizung (Shutdown/Flashback)', description: 'Dissoziation oder Flashback möglich; Realitätsverlust droht.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich muss hier weg; ich kann nicht atmen', label: 'NOTFALL – Extreme Überreizung', description: 'Vollständiger emotionaler Zusammenbruch; Selbstschutzverhalten (Aggression, Flucht, Freeze).', recommendation: 'Notarzt / Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich ertrage das nicht mehr; ich muss mich selbst schützen', label: 'AKUTER NOTFALL', description: 'Totaler psychischer Breakdown; Selbstverletzungsrisiko oder Fremdgefährdung.', recommendation: 'Sofort Emergency (112)', icon: 'bolt' }
];

const antriebScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Mir fehlt jede Energie; ich kann nicht anfangen', label: 'Stupor / Katatonische Lähmung', description: 'Vollständige Apathie; psychomotorische Verlangsamung; neurotisches Erstarren.', icon: 'bolt' },
  { min: 10, max: 20, quote: 'Alles kostet mich maximale Kraft; ich bin erschöpft', label: 'Schwere Depression (Major)', description: 'Schwaches Motivationssignal; Anhedonie dominant.', recommendation: 'Minimierung von Anforderungen; Ressourcenschonung', icon: 'warning' },
  { min: 20, max: 30, quote: 'Ich kann etwas tun, aber es fällt mir schwer', label: 'Moderate Depression', description: 'Milde Aktivierung, Anstrengung notwendig.', recommendation: 'Realistische Ziele setzen' },
  { min: 30, max: 35, quote: 'Ich kriege es hin, aber ohne Freude', label: 'Leichte Depression / Dysthymie', description: 'Antrieb vorhanden, aber emotionale Flachheit.', recommendation: 'Anhedonie adressieren' },
  { min: 35, max: 40, quote: 'Ich schaffe meine Aufgaben; es geht', label: 'Unterer Normbereich', description: 'Deutlich spürbar, aber anstrengend.', recommendation: 'Pacing; Energiemanagement' },
  { min: 40, max: 45, quote: 'Ich bin motiviert; ich mache Fortschritte', label: 'Normbereich / Euthymia', description: 'Ausgeprägter Antrieb mit Balance.', recommendation: 'Strukturierung beibehalten' },
  { min: 45, max: 50, quote: 'Ich bin hochmotiviert; ich will vorankommen', label: 'Oberer Normbereich / Aktivierung', description: 'Starke Aktivierung; konstruktiv.', recommendation: 'Burnout-Prävention; Pausen' },
  { min: 50, max: 55, quote: 'Mein Antrieb ist grenzenlos; ich kann nicht abbremsen', label: 'Erhöhte Aktivität / Zyklothymia', description: 'Grenzfall zwischen Motivation und Überaktivierung.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich bin getrieben; ich muss ständig aktiv sein', label: 'Hypomanie (leicht)', description: 'Hyperaktivierung mit Grandiosität; Schlafbedarf sinkt.', recommendation: 'Ruhe erzwingen; Grounding erforderlich', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich kann nicht stillsitzen; das zerfrisst mich', label: 'Hypomanie (moderat)', description: 'Alltagsfunktion beeinträchtigt; Impulsivität steigt.', recommendation: 'Therapeutische Intervention; Monitoring', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich bin besessen; ich bin in dauerhafter Aktion gefangen', label: 'Hypomanie-Manie-Grenzbereich', description: 'Hoffnungslosigkeit durch Unmöglichkeit zu ruhen; Reizbarkeit.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Mein Antrieb ist zerstörerisch; ich beschädige mich selbst', label: 'Manie (akut)', description: 'Massives Getriebensein; grandiose Gedanken; Selbstschädigung möglich.', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin in der Maschine gefangen; kann nicht stoppen', label: 'Manie (schwer)', description: 'Akute körperliche Gefährdung; Psychose möglich (Herzinfarkt, Kollaps).', recommendation: 'Sofort-Intervention: Psychiatrie/Notarzt', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Totale Überaktivierung; der Körper bricht zusammen', label: 'Akute Manie / Manischer Stupor', description: 'Vollständige physische/psychische Destabilisierung; Fremdgefährdung.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const vermeidungScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich stelle mich den Dingen; ich gehe aktiv hin', label: 'Keine Vermeidung', description: 'Vollständige Expositionsbereitschaft; funktionales Coping; Anpassungsflexibilität.' },
  { min: 10, max: 20, quote: 'Ich bin vorsichtig, aber ich vermeide nicht wirklich', label: 'Minimale Vermeidung', description: 'Schwache Schutzreaktion; realistische Grenzen.', recommendation: 'Bewusstsein für echte Risiken' },
  { min: 20, max: 30, quote: 'Ich weiche manchen Dingen aus, aber ich versuche es später', label: 'Leichte Vermeidung', description: 'Milde Vermeidung; funktional.', recommendation: 'Graduelles Exposure trainieren' },
  { min: 30, max: 35, quote: 'Ich meide das bewusst; das hilft mir', label: 'Erkannte Vermeidung', description: 'Vermeidung als Schutz.', recommendation: 'Sicherheitsverhalten analysieren' },
  { min: 35, max: 40, quote: 'Ich meide mehrere Dinge; es beeinträchtigt mich etwas', label: 'Mäßige Vermeidung', description: 'Deutlich spürbar, aber noch alltäglich möglich.', recommendation: 'Verhaltensaktivierung; kleine Exposures' },
  { min: 40, max: 45, quote: 'Ich kann vieles nicht; mein Leben ist eingeengt', label: 'Moderate Vermeidung', description: 'Ausgeprägtes Vermeidungsmuster.', recommendation: 'Therapeutisches Exposure-Programm' },
  { min: 45, max: 50, quote: 'Ich meide immer mehr; ich bin gefangen', label: 'Steigende Vermeidung', description: 'Starke Vermeidungskaskade; beginnende Lähmung.', recommendation: 'Intensive therapeutische Intervention' },
  { min: 50, max: 55, quote: 'Meine Vermeidung kontrolliert mein Leben', label: 'WENDEPUNKT – Hohe Vermeidung', description: 'Grenzfall zwischen Schutz und totaler Lähmung.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich vermeide fast alles; ich bin isoliert', label: 'Sehr hohe Vermeidung', description: 'Intensive Vermeidung; Funktionsverlust.', recommendation: 'Kognitive Verhaltenstherapie + Exposure dringend', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich kann das Haus kaum verlassen; alles triggert mich', label: 'Kritische Vermeidung', description: 'Alltagsfunktion stark beeinträchtigt; Agoraphob. Tendenzen.', recommendation: 'Therapeutische Intervention; ggf. Stationär', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich bin völlig gefangen; keine Lösungen mehr sichtbar', label: 'Extreme Vermeidung', description: 'Hoffnungslosigkeit durch Totalvermeidung.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Vermeidung hat mich völlig lahmgelegt', label: 'KRISE – Akute Immobilisierung', description: 'Akute Immobilisierung; Suizidgedanken möglich durch Hoffnungslosigkeit.', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin in meiner Vermeidung gefangen; kann nicht raus', label: 'NOTFALL – Extreme Isolation', description: 'Akute psychische Gefährdung; Dehydration/Unterversorgung möglich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Totale Lähmung durch Vermeidung; ich bin vollständig isoliert', label: 'AKUTER NOTFALL', description: 'Vollständige psychische/physische Destabilisierung.', recommendation: 'Emergency-Services/Zwangseinweisung', icon: 'bolt' }
];

const nervositaetScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Mir geht es gut; ich bin völlig ruhig', label: 'Ruhe / Gelassenheit', description: 'Entspannt, kein Grund zur Nervosität; natürliches Wohlbefinden.' },
  { min: 10, max: 20, quote: 'Mir ist ein bisschen unwohl, aber nichts Großes', label: 'Leichte innere Unruhe', description: 'Minimale Anspannung ohne erkennbaren Grund; kaum spürbar.' },
  { min: 20, max: 30, quote: 'Ich bin irgendwie nervös, aber ich weiß nicht warum', label: 'Schwache Nervosität', description: 'Leichte, diffuse Angespanntheit; noch gut zu ignorieren.', recommendation: 'Kurze Pausen, Ablenkung' },
  { min: 30, max: 35, quote: 'Das ist unangenehm; ich kann nicht richtig entspannen', label: 'Mäßige Nervosität', description: 'Deutliche innere Unruhe, aber noch funktionsfähig; erste Grübelgedanken.', recommendation: 'Achtsamkeit, Bewegung' },
  { min: 35, max: 40, quote: 'Ich bin angespannt und nervös; meine Gedanken rasen', label: 'Leicht erhöhte Nervosität', description: 'Körperliche Anzeichen (Zittern, Herzrasen), Konzentrationsprobleme; noch bewältigbar.', recommendation: 'Strukturierte Aktivität' },
  { min: 40, max: 45, quote: 'Ich bin den ganzen Tag nervös; das macht mich müde', label: 'Moderate Nervosität', description: 'Starke innere Unruhe, Schwierigkeiten zu entspannen; ständige Besorgnis ohne Grund.', recommendation: 'Aktive Coping-Strategien' },
  { min: 45, max: 50, quote: 'Das hält mir den ganzen Tag; ich kann nicht abschalten', label: 'Steigende Nervosität', description: 'Intensive diffuse Angst, Grübelzwang, körperliche Spannungen überall.', recommendation: 'PMR, Atemtechniken' },
  { min: 50, max: 55, quote: 'Ich mache mir ständig Sorgen; ich kann nicht mehr denken', label: 'WENDEPUNKT – Hohe Nervosität', description: 'Anhaltende, unkontrollierbare Sorgen über verschiedene Lebensbereiche.', recommendation: 'Tagebuch, Therapie', icon: 'warning' },
  { min: 55, max: 60, quote: 'Das ist unerträglich; ich bin am Ende meiner Kraft', label: 'Sehr hohe Nervosität', description: 'Generalisierte Angststörung (GAS) in vollem Gange; Schlafstörungen.', recommendation: 'Externe Unterstützung dringend', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich verliere die Kontrolle über meine Gedanken; ständig das Schlimmste denken', label: 'Kritische Nervosität', description: 'Extreme diffuse Angst; Panik-ähnliche Gedanken ohne Trigger; Alltag stark beeinträchtigt.', recommendation: 'Sofort Therapeut', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Das kann ich nicht mehr; mir geht es viel zu schlecht', label: 'Extreme Nervosität – Krisenrand', description: 'Vollständige Funktionsbeeinträchtigung; Angst vor Wahnsinn oder Zusammenbruch möglich.', recommendation: 'Notfall-Intervention', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich kann nicht mehr funktionieren; ich muss ins Krankenhaus', label: 'KRISE – Akute Überreizung', description: 'Schwere Angststörung mit Dissoziation oder depressiven Episoden.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Das ist das Schlimmste; ich kann nicht mehr atmen', label: 'NOTFALL – Extreme Nervosität', description: 'Psychische Dekompensation; Selbstschutzverhalten droht.', recommendation: 'Notarzt / Krisentelefon (112)', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich ertrage das nicht mehr; Notfall', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Dekompensation; unmittelbare Selbst- / Fremdgefährdung.', recommendation: 'Emergency (112)', icon: 'bolt' }
];

const angstScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Mir ist völlig sicher; ich fühle mich geborgen', label: 'Keine Angst / Sicherheit', description: 'Völlig ruhig, entspannt, vertraut der Situation.' },
  { min: 10, max: 20, quote: 'Mir ist ein bisschen mulmig, aber nichts Ernstes', label: 'Leichte Besorgnis', description: 'Vages Unbehagen, minimal; leicht zu ignorieren.', recommendation: 'Achtsamkeit' },
  { min: 20, max: 30, quote: 'Ich bin nervös, aber ich schaffe das', label: 'Schwache Angst', description: 'Erste Symptome (schneller Puls, Anspannung); noch kontrollierbar.', recommendation: 'Einfache Atemtechniken' },
  { min: 30, max: 35, quote: 'Das macht mir Angst, aber ich kann noch klar denken', label: 'Mäßige Angst', description: 'Deutliche Besorgnis, aber keine Panik; Fokussierung möglich.', recommendation: 'Grounding, Bewegung' },
  { min: 35, max: 40, quote: 'Mir geht das Herz schneller; ich bin angespannt, aber ich halte durch', label: 'Leicht erhöhte Angst', description: 'Angstreaktionen sichtbar (Zittern, Atemnot); noch funktionsfähig.', recommendation: 'Strukturierte Bewältigung' },
  { min: 40, max: 45, quote: 'Das ist sehr beängstigend; aber ich kann es aushalten', label: 'Moderate Angst', description: 'Starke Angstempfindung, Vermeidungsimpulse; aber noch handlungsfähig.', recommendation: 'Aktive Coping' },
  { min: 45, max: 50, quote: 'Das ist zu viel; ich muss mich beruhigen', label: 'Steigende Angst', description: 'Angst nimmt überhand, Konzentration schwer; intensive Strategien nötig.', recommendation: 'Atemübungen, Ablenkung' },
  { min: 50, max: 55, quote: 'Ich verliere die Kontrolle; Hilfe!', label: 'WENDEPUNKT – Hohe Angst', description: 'Grenzfall zu Panik; Gedanken unkontrolliert.', recommendation: 'Intensive Intervention jetzt (Notfallplan, Co-Regulation)', icon: 'warning' },
  { min: 55, max: 60, quote: 'Das ist die schlimmste Angst, die ich je hatte', label: 'Sehr hohe Angst', description: 'Fast Panik, körperliche Symptome stark (Herzrasen, Schwitzen).', recommendation: 'Externe Unterstützung dringend', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich ersticke; ich sterbe; ich muss hier weg', label: 'Panik – Übergangsbereich', description: 'Panikanfall in vollem Gange; Gefühl zu ersticken oder zu sterben.', recommendation: 'Sofort Hilfe holen', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Das ist furchtbar; ich kann nicht atmen; ich bin nicht real', label: 'Extreme Panik – Krisenrand', description: 'Vollständiger Kontrollverlust; Dissoziation möglich.', recommendation: 'Unmittelbare Notfall-Intervention', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich verliere den Verstand; ich muss ins Krankenhaus', label: 'KRISE – Akute Panik', description: 'Schwere Panikattacke mit potenzieller Selbstgefährdung.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Das ist das Ende; mir passiert etwas Schreckliches', label: 'NOTFALL – Extreme Panik', description: 'Panik mit Psychoserisiko; Todesangst.', recommendation: 'Notarzt / Krisentelefon (112)', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich kann nicht mehr atmen; ich bin tot', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Dekompensation; unmittelbare Selbst- / Fremdgefährdung.', recommendation: 'Emergency (112)', icon: 'bolt' }
];

const sorgeScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Alles ist unter Kontrolle; ich plane entspannt', label: 'Keine Sorge', description: 'Vollständige Abwesenheit von Sorgen; realistische Vorausschau.' },
  { min: 10, max: 20, quote: 'Das könnte problematisch werden, aber ich habs im Griff', label: 'Minimale Sorge', description: 'Schwaches Unbehagen als Frühwarnsignal.', recommendation: 'Minimierung der Überwachung' },
  { min: 20, max: 30, quote: 'Ich mache mir Gedanken; besser vorbereitet sein', label: 'Leichte Sorge', description: 'Milder Alarm als Problemlösung.', recommendation: 'Bewusstsein schärfen, aber regulieren' },
  { min: 30, max: 35, quote: 'Das beunruhigt mich; ich muss das im Auge behalten', label: 'Erkannte Sorge', description: 'Sorge als Selbstschutz.', recommendation: 'Vermeidungstendenzen kontrollieren' },
  { min: 35, max: 40, quote: 'Meine Gedanken kreisen; ich spüre die Anspannung', label: 'Mäßige Sorge', description: 'Deutlich spürbar, kognitives System aktiviert.', recommendation: 'Grundregulation einleiten' },
  { min: 40, max: 45, quote: 'Die Sorge eskaliert; ich kann nicht aufhören zu grübeln', label: 'Moderate Sorge', description: 'Ausgeprägtes mentales Rumination (Grübeln).', recommendation: 'Atemtechniken; Grounding' },
  { min: 45, max: 50, quote: 'Sorge und Wachsamkeit überfordern mich', label: 'Steigende Sorge', description: 'Starke kognitive/physische Reaktion.', recommendation: 'Sensorische Dämpfung; DBT-Skills' },
  { min: 50, max: 55, quote: 'Sorge dominiert; ich verliere die Kontrolle', label: 'WENDEPUNKT – Kritische Hypervigilanz', description: 'Grenzfall Planung/Lähmung.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Vollständige Überflutung; Sorge frisst alles', label: 'Hohe Sorge', description: 'Pathologische Alarmbereitschaft; Intensive Rumination.', recommendation: 'Unterstützung dringend; Expositionstraining', icon: 'warning' },
  { min: 60, max: 65, quote: 'Hypervigilanz + Sorge zerstören meinen Alltag', label: 'Kritische Sorge', description: 'Stark beeinträchtigt; Funktionsverlust.', recommendation: 'Therapeutische Intervention; EMDR', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich sorge mich ständig; das macht mich krank', label: 'Extreme Sorge', description: 'Hoffnungslosigkeit durch ständige Antizipation.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Sorge + Hypervigilanz = totale Paralyse', label: 'KRISE – Akute Überregung', description: 'Suizidgedanken möglich durch Erschöpfung.', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich ertrinke in Sorgen und Wachheit', label: 'NOTFALL – Extreme Überflutung', description: 'Akute Gefährdung; Kollapsrisiko.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Komplette Destabilisierung durch Sorge-Alarm', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Überlastung.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const traurigkeitScale: IntensityLevel[] = [
  { min: 0, max: 5, quote: 'Mir geht es gut; ich bin leicht und frei', label: 'Vollständig unbeschwert', description: 'Keine Traurigkeit; neutral bis leicht positiv; Hoffnung vorhanden.' },
  { min: 5, max: 15, quote: 'Mich trauert etwas, aber ich weiß es geht vorbei', label: 'Leichte Traurigkeit', description: 'Normale Reaktion auf kleine Verluste/Frustration; noch zukunftsorientiert.' },
  { min: 15, max: 25, quote: 'Ich bin traurig, aber ich glaube, es wird besser', label: 'Merkbare Traurigkeit', description: 'Traurigkeit ist erkannt; noch Hoffnung auf Verbesserung vorhanden.' },
  { min: 25, max: 35, quote: 'Mir ist nicht so gut zumute, aber es gibt noch ein paar schöne Momente', label: 'Moderate Traurigkeit', description: 'Traurigkeit präsent; aber noch Freude an kleinen Dingen möglich.' },
  { min: 35, max: 45, quote: 'Ich bin traurig und müde, aber ich glaube an bessere Tage', label: 'Traurigkeit mit Hoffnung', description: 'Deutliche Traurigkeit; aber Hoffnung auf Verbesserung noch vorhanden.', recommendation: 'Normale Coping-Strategien' },
  { min: 45, max: 55, quote: 'Mich überkommt ständig Traurigkeit; die Hoffnung schwindet', label: 'Tiefe Traurigkeit', description: 'Traurigkeit dominiert alltägliche Gedanken; Hoffnungslosigkeit beginnt.', recommendation: 'Unterstützung suchen (Freunde, Therapie)', icon: 'warning' },
  { min: 55, max: 65, quote: 'Nichts hat mehr Sinn; es wird sich nie ändern', label: 'Schwere Traurigkeit', description: 'Tiefe Hoffnungslosigkeit; wenig Grund für Optimismus erkennbar.', recommendation: 'Intens. Unterstützung erforderlich; Therapeut kontaktieren', icon: 'warning' },
  { min: 65, max: 75, quote: 'Ich sehe keinen Weg raus; ich möchte nicht mehr leben', label: 'Verzweiflung / Depressive Krise', description: 'Intense Verzweiflung; Zukunft wirkt ausweglos; Suizidales Ideation möglich.', recommendation: 'SOFORT Therapeut/Krisentelefon kontaktieren', icon: 'bolt' },
  { min: 75, max: 85, quote: 'Ich möchte mein Leben beenden; alles ist hoffnungslos', label: 'Akute Suizidales Ideation', description: 'Suizidales Denken aktiv; Hoffnung völlig erloschen.', recommendation: 'NOTFALL: Krisentelefon oder Notaufnahme anrufen', icon: 'bolt' },
  { min: 85, max: 100, quote: 'Ich kann nicht mehr weiterleben; der Schmerz ist unerträglich', label: 'Suizidales Notfall', description: 'Unmittelbare Lebensgefahr; psychotische Züge möglich.', recommendation: 'NOTFALL: 112', icon: 'bolt' }
];

const verzweiflungScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich sehe Lösungen; die Zukunft ist offen', label: 'Keine Verzweiflung', description: 'Vollständige Hoffnungsfähigkeit; Zukunftsorientierung; Resilienz vorhanden.' },
  { min: 10, max: 20, quote: 'Gerade ist es schwer, aber es wird besser', label: 'Minimale Verzweiflung', description: 'Schwache Hoffnungslosigkeit; realistische Sorge.', recommendation: 'Bewusstsein für Bewältigung' },
  { min: 20, max: 30, quote: 'Ich bin niedergeschlagen, aber ich glaube noch an Besserung', label: 'Leichte Verzweiflung', description: 'Milde Hoffnungslosigkeit; temporär.', recommendation: 'Kognitive Umstrukturierung trainieren' },
  { min: 30, max: 35, quote: 'Ich zweifle, ob sich das ändert; mir fehlt die Kraft', label: 'Erkannte Verzweiflung', description: 'Pessimismus; Verzweiflung als Bedrohungssignal.', recommendation: 'Hoffnungsaktivierung; Zielplanung' },
  { min: 35, max: 40, quote: 'Ich sehe kaum noch Lösungen; Hoffnung wird dünn', label: 'Mäßige Verzweiflung', description: 'Deutlich spürbar, aber noch Ressourcen vorhanden.', recommendation: 'Therapeutische Unterstützung; Problemlösetraining' },
  { min: 40, max: 45, quote: 'Ich kann kaum noch hoffen; alles sieht grau aus', label: 'Moderate Verzweiflung', description: 'Ausgeprägtes Hoffnungsdefizit.', recommendation: 'Depressionstherapie; CBT-Fokus' },
  { min: 45, max: 50, quote: 'Ich sehe keine Zukunft mehr; warum weitermachen?', label: 'Steigende Verzweiflung', description: 'Starke Hoffnungslosigkeit; erste Suizidgedanken möglich.', recommendation: 'Intensive therapeutische Intervention; Monitoring' },
  { min: 50, max: 55, quote: 'Alles ist sinnlos; ich kann nicht mehr', label: 'WENDEPUNKT – Tiefe Verzweiflung', description: 'Grenzfall zwischen Trauer und Suizidalität.', recommendation: 'Psychologische Intervention sinnvoll; Sicherheitsplanung', icon: 'warning' },
  { min: 55, max: 60, quote: 'Das Leben hat keinen Sinn; ich will sterben', label: 'Sehr hohe Verzweiflung', description: 'Intensive Hoffnungslosigkeit; Suizidale Ideation.', recommendation: 'Sofortige psychiatrische Risikobewertung erforderlich', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin lebensüberdrüssig; mir ist alles egal', label: 'Kritische Verzweiflung', description: 'Alltagsfunktion gelähmt; Passiver Todeswunsch.', recommendation: 'Therapeutische Intervention; stationäre Behandlung', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich habe Pläne; ich will mein Leben beenden', label: 'Extreme Verzweiflung', description: 'Hoffnungslosigkeit absolut; aktive Suizidalität.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich kann nicht mehr weiterleben; das ist unmöglich', label: 'KRISE – Akute Suizidgefährdung', description: 'Aktive Suizidplanung/Vorbereitung möglich.', recommendation: 'Unmittelbare Intervention erforderlich; Krisentelefon', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich sterbe heute; alles ist vorbei', label: 'NOTFALL – Hochakute Suizidalität', description: 'Unmittelbare Lebensgefahr; Suizidversuch wahrscheinlich.', recommendation: 'Sofort-Intervention: Notruf 112 / Psychiatrie', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Der Tod ist die einzige Lösung; ich bin erleichtert', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Suizidversuch imminent.', recommendation: 'Zwangseinweisung/Intensivüberwachung', icon: 'bolt' }
];

const sehnsuchtScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich bin zufrieden mit dem Hier und Jetzt', label: 'Keine Sehnsucht', description: 'Vollständige Gegenwärtigkeit; keine Verlusterfahrung; Akzeptanz.' },
  { min: 10, max: 20, quote: 'Ich denke manchmal an früher, aber es geht mir gut', label: 'Minimale Sehnsucht', description: 'Schwache Sehnsucht; adaptive Erinnerung.', recommendation: 'Bewusstsein für Verlust integrieren' },
  { min: 20, max: 30, quote: 'Ich vermisse etwas, aber ich lebe damit', label: 'Leichte Sehnsucht', description: 'Milde Sehnsucht; funktional.', recommendation: 'Trauer als normale Emotion anerkennen' },
  { min: 30, max: 35, quote: 'Ich vermisse die Vergangenheit; das schmerzt', label: 'Erkannte Sehnsucht', description: 'Trauernde Nostalgie; Sehnsucht als Trauersignal.', recommendation: 'Trauerprozess unterstützen; Abschied ermöglichen' },
  { min: 35, max: 40, quote: 'Ich sehne mich nach etwas Vergangenem; es fehlt mir täglich', label: 'Mäßige Sehnsucht', description: 'Deutlich spürbar, aber noch funktional.', recommendation: 'Achtsamkeit für Gegenwart; Ressourcen-Fokus' },
  { min: 40, max: 45, quote: 'Ich bin erfüllt von Sehnsucht; das brauche ich zurück', label: 'Moderate Sehnsucht', description: 'Ausgeprägtes Verlustgefühl; Normbereich Trauer.', recommendation: 'Psychotherapie; Trauerbewältigung' },
  { min: 45, max: 50, quote: 'Die Sehnsucht überwältigt mich; ich kann nicht akzeptieren', label: 'Steigende Sehnsucht', description: 'Starke emotionale Belastung; Verleugnung der Realität.', recommendation: 'Therapeutische Unterstützung; Akzeptanztraining' },
  { min: 50, max: 55, quote: 'Ich ersticke in der Sehnsucht; ohne das kann ich nicht leben', label: 'WENDEPUNKT – Tiefe Sehnsucht', description: 'Grenzfall zwischen Trauer und Suchtverhalten.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Mein Leben ist vorbei; alles war früher besser', label: 'Sehr hohe Sehnsucht', description: 'Intensive Sehnsucht; Pathologische Nostalgie.', recommendation: 'Realitätsprüfung erforderlich; Rumination adressieren', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich kann ohne das Verlorene nicht mehr leben; ich bin gefangen', label: 'Kritische Sehnsucht', description: 'Alltagsfunktion beeinträchtigt; Suchtmuster möglich (Substanzen, Beziehungen).', recommendation: 'Therap. Intervention; Substitution adressieren', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Meine Sehnsucht zerstört mein Leben; ich verleugne die Realität vollständig', label: 'Extreme Sehnsucht', description: 'Hoffnungslosigkeit durch Unmöglichkeit der Rückkehr.', recommendation: 'Professionelle Hilfe JETZT; Identitätstherapie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich kann nicht ohne das Verlorene existieren', label: 'KRISE – Akute Sehnsuchtüberflutung', description: 'Suizidgedanken möglich (Sehnsucht nach Verschmelzung/Tod).', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Mein Sein ist das Verlorene; ich bin nichts ohne es', label: 'NOTFALL – Extreme Sehnsuchtpsychose', description: 'Akute psychische Gefährdung; Depersonalisierung möglich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin eins mit meiner Sehnsucht; die Realität existiert nicht', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Psychose/Suizidalität.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const einsamkeitScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich fühle mich verbunden; ich bin nicht allein', label: 'Keine Einsamkeit', description: 'Vollständige soziale Sicherheit; sichere Bindungen; Zugehörigkeitsgefühl.' },
  { min: 10, max: 20, quote: 'Ich bin manchmal allein, aber das ist okay', label: 'Minimale Einsamkeit', description: 'Schwaches Isolationsgefühl; adaptive Einsamkeit.', recommendation: 'Bewusstsein für Bedarf an Kontakt' },
  { min: 20, max: 30, quote: 'Ich vermisse Kontakt; ich bin etwas isoliert', label: 'Leichte Einsamkeit', description: 'Milde Einsamkeit; Kontaktsuche möglich.', recommendation: 'Soziale Aktivitäten initiieren' },
  { min: 30, max: 35, quote: 'Ich fühle mich allein, obwohl Menschen um mich sind', label: 'Erkannte Einsamkeit', description: 'Einsamkeit als Beziehungs-Warnsignal.', recommendation: 'Bindungsmuster reflektieren; Vertrauen aufbauen' },
  { min: 35, max: 40, quote: 'Ich bin von Menschen isoliert; es schmerzt täglich', label: 'Mäßige Einsamkeit', description: 'Deutlich spürbar, aber noch Kontaktfähigkeit vorhanden.', recommendation: 'Soziale Fähigkeiten trainieren; Gruppentherapie' },
  { min: 40, max: 45, quote: 'Ich bin einsam; Beziehungen fühlen sich leer an', label: 'Moderate Einsamkeit', description: 'Ausgeprägtes Isolationsgefühl; Misstrauen wächst.', recommendation: 'Psychotherapie; Bindungstrauma adressieren' },
  { min: 45, max: 50, quote: 'Niemand versteht mich; ich bin fundamental allein', label: 'Steigende Einsamkeit', description: 'Starke emotionale Isolation; Kontaktangst.', recommendation: 'Therapeutische Unterstützung; Vertrauensaufbau' },
  { min: 50, max: 55, quote: 'Ich bin vollständig allein; niemand kann mir helfen', label: 'WENDEPUNKT – Tiefe Einsamkeit', description: 'Grenzfall zwischen Isolation und Hoffnungslosigkeit.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich bin ausgestoßen; Beziehungen sind unmöglich', label: 'Sehr hohe Einsamkeit', description: 'Intensive Abwehrhaltung gegen Kontakt; Pathologische Isolation.', recommendation: 'Expositionstraining für Beziehungen erforderlich', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin verdammt zur Einsamkeit; ich bin giftig für andere', label: 'Kritische Einsamkeit', description: 'Alltagsfunktion beeinträchtigt; Paranoia möglich.', recommendation: 'Therapeutische Intervention; Realitätsprüfung', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Meine Einsamkeit ist unerträglich; ich gehöre hier nicht hin', label: 'Extreme Einsamkeit', description: 'Hoffnungslosigkeit durch empfundene Unlösbarkeit.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich bin von der Menschheit getrennt; ich bin ein Monster', label: 'KRISE – Akute Entfremdung', description: 'Suizidgedanken möglich (Erlösung durch Tod).', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin nicht menschlich; niemand wird mich je verstehen', label: 'NOTFALL – Extreme Entfremdung', description: 'Akute psychische Gefährdung; Depersonalisierung/Derealisierung.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin vollständig vom Leben getrennt; der Tod ist Erlösung', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Suizidalität.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const freudeScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Alles ist hoffnungslos; ich sehe keine Lösung', label: 'Dissoziation / Suizid-Gefahr', description: 'NOTFALL - SOFORT-Hilfe', icon: 'bolt' },
  { min: 10, max: 20, quote: 'Ich bin so traurig, aber vielleicht hilft mir jemand', label: 'Mittlere / schwere Depr.', description: 'Tiefe Traurigkeit; Unterstützung benötigt', icon: 'warning' },
  { min: 20, max: 30, quote: 'Ich habe keine Lust/Kraft', label: 'Leichte Depression', description: 'Gedrückt, wenig Freude, aber Hoffnungszeichen' },
  { min: 30, max: 35, quote: 'Ich brauche mehr Stimulation; es fällt mir schwer, aktiv zu werden', label: 'Leichte Aktivierung', description: 'Schwach positiv, Hoffnung wächst, erste Motivationsspuren' },
  { min: 35, max: 40, quote: 'Mir geht es gut, ich funktioniere normal', label: 'Normalzustand', description: 'Stabil, ausgeglichen, zufrieden, ausreichende Energie für Alltägliches' },
  { min: 40, max: 45, quote: 'Ich habe Lust, Dinge zu tun; freue mich auf Sachen', label: 'Gute Laune', description: 'Gute Laune, erste lebendige Gefühle' },
  { min: 45, max: 50, quote: 'Ich freue mich auf und über mein Leben', label: 'Idealer Funktionszustand', description: 'Motivation + Lebensfreude spürbar und stabil' },
  { min: 50, max: 55, quote: 'Ich bin voller Energie; möchte ständig etwas tun', label: 'Hohe Freude', description: 'Viel Engagement; Aktivität und Motivation sehr hoch' },
  { min: 55, max: 60, quote: 'Ich bin kaum zu bremsen', label: 'Sehr hohe Freude', description: 'Intensives Engagement, erste Überaktivierungssignale möglich', icon: 'star' },
  { min: 60, max: 65, quote: 'Meine Freude ist zu viel; bin aufgedreht; kann mich nicht bremsen', label: 'Beginnende Warnsignale', description: 'Sehr hohe Freude, Überaktivierung sichtbar; Impulsivität nimmt zu', icon: 'warning' },
  { min: 65, max: 70, quote: 'Bin überglücklich; alles ist herrlich; meine Freude ist überschießend', label: 'Deutliche Überaktivierung', description: 'Gedanken rasen; extreme Aktivität; Schlafbedarf sinkt', icon: 'warning' },
  { min: 70, max: 85, quote: 'Meine Freude kennt keine Grenzen, nichts kann mich runterziehen', label: 'Hypomania', description: 'Chaotische Aktivität, Schlaf kaum möglich, Rücksichtslosigkeit wächst', icon: 'bolt' },
  { min: 85, max: 100, quote: 'Bin ekstatisch; nichts kann mich stoppen; Welt dreht sich um meine Freude', label: 'Akute Manie', description: 'Krisen-Intervention (NOTFALL)', icon: 'bolt' }
];

const schamScale: IntensityLevel[] = [
  { min: 0, max: 5, quote: 'Mir ist nichts peinlich.', label: 'Keine Scham', description: 'Völlig entspannt, nichts ist peinlich.', recommendation: 'Mindfulness; Wertschätzung bewahren' },
  { min: 5, max: 10, quote: 'Mir ist das etwas peinlich.', label: 'Leichte Peinlichkeit', description: 'Leichte soziale Unsicherheit, geringfügig unangenehm, Blickkontakt bleibt möglich.', recommendation: 'PLEASE Skill (Schlaf, Bewegung); positive Aktivitäten' },
  { min: 10, max: 30, quote: 'Ich schäme mich ein bisschen dafür.', label: 'Leichte Scham', description: 'Leichter emotionaler Rückzug, beginnende Selbstzweifel, erste unauffällige Vermeidung.', recommendation: 'Mindfulness (Gedanken beobachten); Selbstmitgefühl üben' },
  { min: 30, max: 40, quote: 'Das ist mir jetzt unangenehm geworden.', label: 'Zunehmende Scham', description: 'Erstes Erröten, wachs. Unruhe/körperl. Anspannung; Rückzugswunsch wächst.', recommendation: 'Opposite Action (trotz Scham mit anderen reden); Fakten überprüfen' },
  { min: 40, max: 50, quote: 'Ich schäme mich richtig dafür.', label: 'Mittlere Scham', description: 'Deutliche Selbstzweifel, innere Kritik, Vermeidung von Blickkontakt, Herzrasen möglich.', recommendation: 'ABC PLEASE; Selbst-Validierung; Exposure (Gedanken aussprechen)' },
  { min: 50, max: 60, quote: 'Ich will das nicht zeigen, es ist mir zu peinlich.', label: 'Wachsende Scham', description: 'Starke Vermeidung, körperl. Anspannung bis Erstarrung.', recommendation: 'Distress Tolerance: TIPP-Skill; Radical Acceptance' },
  { min: 60, max: 70, quote: 'Ich bin total beschämt und will mich verkriechen.', label: 'Starke Scham', description: 'Intensiver Versteckenwunsch, tiefe Selbstabwertung, emotionale Überforderung.', recommendation: 'Opposite Action intensivieren; Notfall-Hotline; Therapeutischen Kontakt suchen', icon: 'warning' },
  { min: 70, max: 90, quote: 'Ich möchte im Boden versinken und verschwinden.', label: 'Extreme Scham/Urscham', description: 'Vollständige Selbstzerstörung, Gefühl totaler Wertlosigkeit, Isolationstrieb.', recommendation: 'Distress Tolerance: Eiswasser an Gesicht; Intensiver körperlicher Reiz; Sofortiger Therapeuten-Kontakt', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin nichts; die Welt dreht sich um meine Schande.', label: 'Akute Scham-Krise', description: 'Dissoziation, Zusammenbruch, Intervention notwendig.', recommendation: 'NOTFALL – Krisenintervention; Maximale Distress Tolerance', icon: 'bolt' }
];

const schuldScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich habe nichts zu bereuen; meine Ehre ist unbefleckt', label: 'Keine Schuldgefühle', description: 'Vollständige Abwesenheit von Schuld; keine innere Konfrontation.' },
  { min: 10, max: 20, quote: 'Das war nicht mein Fehler; mein Ruf ist intact', label: 'Minimale Schuld', description: 'Schwaches Unbehagen; Rationalisierung/Selbstrechtfertigung überwiegt.', recommendation: 'Minimierung der eigenen Rolle' },
  { min: 20, max: 30, quote: 'Ich könnte es bereuen, aber es schadet meinem Ansehen nicht', label: 'Leichte Schuld / Bedauern', description: 'Mild unangenehm, aber schnell verdrängt.', recommendation: 'Oberflächliches Schuldeingeständnis' },
  { min: 30, max: 35, quote: 'Das ärgert mich ein wenig; meine Ehre leidet kaum darunter', label: 'Erkannte Schuld', description: 'Unangenehm; Bewusstsein der Mitverantwortung.', recommendation: 'Vermeidungstendenzen - Ablenkung suchen' },
  { min: 35, max: 40, quote: 'Ich habe einen Fehler gemacht, aber ich kann noch damit leben', label: 'Mäßige Schuld', description: 'Deutlich spürbar, aber noch funktionsfähig.', recommendation: 'Schuldeingeständnis ohne tiefe Selbstkritik' },
  { min: 40, max: 45, quote: 'Das belastet mein Gewissen; mein Ruf könnte leiden', label: 'Moderate Schuld', description: 'Ausgeprägtes Unbehagen.', recommendation: 'Drang zur Wiedergutmachung; innere Zerreißproben' },
  { min: 45, max: 50, quote: 'Ich schäme mich langsam; was werden die anderen denken?', label: 'Steigende Schuld', description: 'Starke emotionale Belastung.', recommendation: 'Intensive Selbstvorwürfe; aktive Reue' },
  { min: 50, max: 55, quote: 'Meine Schuld wiegt schwer; ich verliere meine Ehre', label: 'WENDEPUNKT – Hohe Anspannung', description: 'Grenzfall zwischen Verarbeitung und Lähmung.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich kann mir das nicht verzeihen; mein Ruf ist ruiniert', label: 'Sehr hohe Anspannung', description: 'Intensive Selbstzerstörung; Rumination dominiert.', recommendation: 'Unterstützung dringend erforderlich', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin schuldig und entehrt; ich kann mir nicht in die Augen sehen', label: 'Kritische Schuld', description: 'Alltagsfunktion stark beeinträchtigt.', recommendation: 'Pathologische Schuldneigung - Therapeutische Intervention', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Meine Schuld ist unerträglich; ich bin unwürdig und beschämt', label: 'Extreme Schuld', description: 'Krisenrand; Hoffnungslosigkeit.', recommendation: 'Selbstbestrafungstendenzen möglich; professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich bin vollständig entehrt; die Schuld frisst mich auf', label: 'KRISE – Akute Überregung', description: 'Selbstverurteilung.', recommendation: 'Suizidgedanken möglich; unmittelbare therapeutische Intervention', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Meine Schuld ist unverzeihbar; ich verdiene Verachtung', label: 'NOTFALL – Extreme Krise', description: 'Akute psychische Gefährdung; Selbstverletzungsrisiko.', recommendation: 'Sofort-Intervention', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin zugrunde gerichtet; meine Schuld und Schande sind absolut', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung.', recommendation: 'Unmittelbare Sicherheitsgefährdung - Klinikaufnahme', icon: 'bolt' }
];

const ekelScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich fühle mich sicher; nichts stört mich', label: 'Kein Ekel', description: 'Vollständige Abwesenheit von Ekelreaktion; kein Schutzmechanismus aktiv.' },
  { min: 10, max: 20, quote: 'Das ist etwas unangenehm, aber ich bin aufmerksam', label: 'Minimaler Ekel', description: 'Schwaches Unbehagen als Frühwarnsignal.', recommendation: 'Minimierung der Überwachung' },
  { min: 20, max: 30, quote: 'Das weckt Unbehagen; ich scanne die Umgebung', label: 'Leichter Ekel', description: 'Milder Ekel als Bedrohungserkennung.', recommendation: 'Bewusstsein schärfen, aber regulieren' },
  { min: 30, max: 35, quote: 'Das triggert mich; ich muss Abstand halten', label: 'Erkannter Ekel', description: 'Ekel als Selbstschutz.', recommendation: 'Vermeidungstendenzen kontrollieren' },
  { min: 35, max: 40, quote: 'Mein Körper reagiert; ich spüre die Überforderung', label: 'Mäßiger Ekel', description: 'Deutlich spürbar, vegetatives System aktiviert.', recommendation: 'Grundregulation einleiten' },
  { min: 40, max: 45, quote: 'Der Ekel eskaliert; ich kann nicht abschalten', label: 'Moderater Ekel', description: 'Ausgeprägtes Unbehagen mit Herzfrequenzabfall.', recommendation: 'Atemtechniken; Grounding' },
  { min: 45, max: 50, quote: 'Ekel und Überwachung lähmen mich fast', label: 'Steigender Ekel', description: 'Starke emotionale/physische Reaktion.', recommendation: 'Sensorische Dämpfung; DBT-Skills' },
  { min: 50, max: 55, quote: 'Ekel dominiert; ich verliere die Kontrolle', label: 'WENDEPUNKT – Kritische Hypervigilanz', description: 'Grenzfall Toleranz/Lähmung.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Vollständige Überflutung; Ekel frisst alles', label: 'Hoher Ekel', description: 'Intensive Rumination.', recommendation: 'Unterstützung dringend; Expositionstraining', icon: 'warning' },
  { min: 60, max: 65, quote: 'Hypervigilanz + Ekel zerstören meinen Alltag', label: 'Kritischer Ekel', description: 'Stark beeinträchtigt; Funktionsverlust.', recommendation: 'Therapeutische Intervention; EMDR', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich scanne ständig; Ekel macht mich krank', label: 'Extremer Ekel', description: 'Hoffnungslosigkeit durch ständige Alarmbereitschaft.', recommendation: 'Professionelle Hilfe JETZT', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ekel + Hypervigilanz = totale Paralyse', label: 'KRISE – Akute Überregung', description: 'Suizidgedanken möglich durch Erschöpfung.', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich ertrinke in Ekel und Wachheit', label: 'NOTFALL – Extreme Überflutung', description: 'Akute Gefährdung; Kollapsrisiko.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Komplette Destabilisierung durch Ekel-Alarm', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Überlastung.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const epistemicScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich bin mir unsicher, aber das ist okay; ich lerne gerne', label: 'Offenheit', description: 'Vollständige Offenheit für neue Information; Fehlertoleranz; Lernfähigkeit.' },
  { min: 10, max: 20, quote: 'Ich überprüfe Informationen, aber ich bleibe offen', label: 'Minimale epist. Hypervigilanz', description: 'Schwaches Kontroll-Signal; realistische Skepsis.', recommendation: 'Bewusstsein für epistemische Grenzen' },
  { min: 20, max: 30, quote: 'Ich stelle Fragen, bevor ich akzeptiere; ich lasse mich gern belehren', label: 'Leichte epist. Hypervigilanz', description: 'Milde Informations-Kontrolle; adaptiv.', recommendation: 'Realistische Überprüfung trainieren' },
  { min: 30, max: 40, quote: 'Ich muss wissen, dass ich Recht habe, bevor ich mich einmische', label: 'Erkannte epist. Hypervigilanz', description: 'Epistemische Kontrolle als Schutz.', recommendation: 'Toleranz für Unsicherheit trainieren; Fehlertoleranz' },
  { min: 40, max: 50, quote: 'Ich streite nur, wenn ich weiß, dass ich Recht habe; sonst halte ich mich raus', label: 'Mäßige epist. Hypervigilanz', description: 'Konfliktvermeidung bei Unsicherheit; Isolationstendenz.', recommendation: 'Psychotherapie; Debattenkultur-Training' },
  { min: 50, max: 60, quote: 'Ich muss alles überprüfen, bevor ich es glaube; ich kann nicht mit Unsicherheit leben', label: 'Moderate epist. Hypervigilanz', description: 'Ausgeprägter Kontroll-Drang; Rumination über Wahrheit.', recommendation: 'Akzeptanz von Unsicherheit; Toleranztraining' },
  { min: 60, max: 70, quote: 'Ich zweifle alles an; ich kann keinem Argument trauen; ich muss Beweis sehen', label: 'Hohe epist. Hypervigilanz', description: 'Zwangs-ähnliche Überprüfung; Argumentations-Blockade; Unfähigkeit zu entscheiden.', recommendation: 'Intensive therapeutische Intervention; OCD-Spektrum Monitoring', icon: 'warning' },
  { min: 70, max: 80, quote: 'Alle lügen mich an; ich kann keine Information akzeptieren; niemand ist verlässlich', label: 'Kritische epist. Hypervigilanz', description: 'Epistemische Paranoia aktiviert; Realitätsprüfung unmöglich.', recommendation: 'Therapeutische Intervention; Realitäts-Anker erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich weiß nicht mehr, was wahr ist; jede Information ist verdächtig', label: 'Extreme epist. Hypervigilanz', description: 'Kognitive Desorganisation möglich; Wahngedanken über Täuschung.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Nichts ist wahr; alles ist eine Verschwörung; ich kann niemandem trauen', label: 'AKUTER NOTFALL', description: 'Psychotische Desorganisation; Verfolgungswahn; vollständiger Funktionsverlust.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const ohnmachtScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich kann mein Leben gestalten; ich habe Kontrolle', label: 'Keine Ohnmacht', description: 'Vollständige Handlungsfähigkeit; realistische Selbstwirksamkeit; Agentur.' },
  { min: 10, max: 20, quote: 'Ich bin meist wirksam, manchmal bin ich unsicher', label: 'Minimale Ohnmacht', description: 'Schwaches Kontrollverlust-Signal; realistische Grenzen.', recommendation: 'Bewusstsein für eigene Grenzen' },
  { min: 20, max: 30, quote: 'Ich kann vieles beeinflussen, aber nicht alles', label: 'Leichte Ohnmacht', description: 'Milde Einschränkung; funktional.', recommendation: 'Akzeptanztraining; Fokus auf das Kontrollierbare' },
  { min: 30, max: 35, quote: 'Ich merke, dass ich nicht alles kontrollieren kann; das beunruhigt mich', label: 'Erkannte Ohnmacht', description: 'Ohnmacht als Warnsignal.', recommendation: 'Realitätsprüfung; Grenzenakzeptanz trainieren' },
  { min: 35, max: 40, quote: 'Ich kann wenig ändern; ich bin frustriert', label: 'Mäßige Ohnmacht', description: 'Deutlich spürbar, aber noch funktional.', recommendation: 'Empowerment-Training; Handlungsspielraum identifizieren' },
  { min: 40, max: 45, quote: 'Ich bin hilflos; meine Bemühungen zählen nicht', label: 'Moderate Ohnmacht', description: 'Ausgeprägter Kontrollverlust.', recommendation: 'Psychotherapie; Selbstwirksamkeitsaufbau' },
  { min: 45, max: 50, quote: 'Ich bin gefangen; ich kann mein Leben nicht lenken', label: 'Steigende Ohnmacht', description: 'Starker Handlungsverlust; Frustration wächst.', recommendation: 'Therapeutische Unterstützung; Agentivity-Fokus' },
  { min: 50, max: 55, quote: 'Alles ist zwecklos; meine Handlungen haben keine Auswirkung', label: 'WENDEPUNKT – Tiefe Ohnmacht', description: 'Grenzfall zwischen Realitätsprüfung und Resignation.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich bin völlig hilflos; ich bin paralysiert', label: 'Sehr hohe Ohnmacht', description: 'Intensive Lähmung; Freeze-Response aktiviert.', recommendation: 'Therapeutische Intervention; Körperarbeit erforderlich', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin völlig wirkungslos; niemand hört auf mich', label: 'Kritische Ohnmacht', description: 'Alltagsfunktion beeinträchtigt; Abhängigkeitsneigung.', recommendation: 'Therapeutische Intervention; Stimmenaktivierung', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Mein Leben ist nicht mein eigenes; ich bin ein Spielball', label: 'Extreme Ohnmacht', description: 'Hoffnungslosigkeit durch totalen Kontrollverlust.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich bin völlig gefangen; ich kann nicht entkommen', label: 'KRISE – Akute Lähmung', description: 'Traumatische Reinszenierung möglich; Suizidgedanken durch Aussichtslosigkeit.', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin ein Ding; ich bin nicht menschlich', label: 'NOTFALL – Extreme Hilflosigkeit', description: 'Akute psychische Gefährdung; Depersonalisierung/Objektifizierung.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin vollständig entmächtigt; mein Leben gehört mir nicht', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Dissoziation möglich.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const misstrauenScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich vertraue Menschen; ich gehe offen auf sie zu', label: 'Kein Misstrauen', description: 'Vollständige Vertrauensfähigkeit; sichere Bindung; offene Haltung.' },
  { min: 10, max: 20, quote: 'Ich bin vorsichtig, aber ich vertraue grundsätzlich', label: 'Minimales Misstrauen', description: 'Schwaches Schutz-Signal; realistische Urteilsfähigkeit.', recommendation: 'Bewusstsein für Grenzen' },
  { min: 20, max: 30, quote: 'Ich bin skeptisch gegenüber manchen, aber offen für andere', label: 'Leichtes Misstrauen', description: 'Milde Vorsicht; funktional.', recommendation: 'Menschenkenntnis trainieren; Vertrauensgradienten' },
  { min: 30, max: 40, quote: 'Ich bin vorsichtig mit Menschen; viele sind unzuverlässig', label: 'Erkanntes Misstrauen', description: 'Misstrauen als Schutz.', recommendation: 'Vertrauensaufbau trainieren; sichere Personen identifizieren' },
  { min: 40, max: 50, quote: 'Ich kann den meisten nicht trauen; ich bin auf der Hut', label: 'Mäßiges Misstrauen', description: 'Deutlich spürbar; Isolationstendenz wächst.', recommendation: 'Therapeutische Unterstützung; Vertrauensexperimente' },
  { min: 50, max: 60, quote: 'Ich glaube, dass Menschen mich ausnutzen; ich bin vorsichtig', label: 'Moderates Misstrauen', description: 'Ausgeprägtes Misstrauen.', recommendation: 'Psychotherapie; Bindungstrauma adressieren' },
  { min: 60, max: 70, quote: 'Niemand ist zu trauen; alle haben versteckte Absichten', label: 'Hohes Misstrauen', description: 'Starker Kontrollverlust über Vertrauensfähigkeit; Hypervigilanz dominant.', recommendation: 'Intensive therapeutische Intervention; Paranoia-Monitoring', icon: 'warning' },
  { min: 70, max: 80, quote: 'Alle sind gegen mich; ich bin von Feinden umgeben', label: 'Kritisches Misstrauen', description: 'Alltagsfunktion beeinträchtigt; paranoide Gedanken.', recommendation: 'Therapeutische Intervention; Realitätsprüfung erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin sicher, dass man mich verfolgt; niemand ist sicher', label: 'Extremes Misstrauen', description: 'Akute psychische Gefährdung; Wahngedanken möglich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Alle sind Teil der Verschwörung; ich bin vollständig isoliert', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Psychose möglich; Fremdgefährdung.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const widerwilleScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich bin offen für Menschen und Ideen; ich urteile nicht vorschnell', label: 'Kein Widerwille', description: 'Vollständige Toleranz; keine moralische Aversion; Akzeptanzfähigkeit.' },
  { min: 10, max: 20, quote: 'Ich habe Vorbehalte, aber ich bleibe offen', label: 'Minimaler Widerwille', description: 'Schwaches Ablehnungs-Signal; realistische Grenzen.', recommendation: 'Bewusstsein für eigene Werte' },
  { min: 20, max: 30, quote: 'Das mag ich nicht, aber ich kann damit leben', label: 'Leichter Widerwille', description: 'Milde moralische Aversion; funktional.', recommendation: 'Grenzensetzen trainieren' },
  { min: 30, max: 35, quote: 'Das ekelt mich moralisch an; das kann ich nicht unterstützen', label: 'Erkannter Widerwille', description: 'Moralische Ablehnung; Widerwille als Wertschutz.', recommendation: 'Grenzen klar kommunizieren; Konflikte managen' },
  { min: 35, max: 40, quote: 'Das ekelt mich an; ich muss Abstand nehmen', label: 'Mäßiger Widerwille', description: 'Deutlich spürbar, aber noch funktional.', recommendation: 'Toleranztraining; Perspektivwechsel' },
  { min: 40, max: 45, quote: 'Ich lehne das fundamental ab; ich kann nicht damit leben', label: 'Moderater Widerwille', description: 'Ausgeprägter moralischer Widerwille.', recommendation: 'Psychotherapie; Werteklarifikation; Kompromissfähigkeit' },
  { min: 45, max: 50, quote: 'Das ist ekelhaft; ich will nichts damit zu tun haben', label: 'Steigender Widerwille', description: 'Starke Ablehnung; Isolationstendenz.', recommendation: 'Therapeutische Unterstützung; Kontakt-Reduktion managen' },
  { min: 50, max: 55, quote: 'Alles ekelt mich an; ich kann niemanden mehr vertrauen', label: 'WENDEPUNKT – Tiefe Widerwille', description: 'Grenzfall zwischen Grenzensetzen und Paranoia.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich verachte das; die ganze Welt ekelt mich an', label: 'Sehr hoher Widerwille', description: 'Intensive moralische Aversion.', recommendation: 'Therapeutische Intervention; Misanthropie adressieren', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin von Ekel erfüllt; ich kann niemanden ertragen', label: 'Kritischer Widerwille', description: 'Alltagsfunktion beeinträchtigt; Beziehungsabbruch wahrscheinlich.', recommendation: 'Therapeutische Intervention; Spaltung adressieren', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Alles ist ekelhaft; die Menschheit ist zugrunde gerichtet', label: 'Extremer Widerwille', description: 'Hoffnungslosigkeit durch moralische Überzeugung von Verfall.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich verachte die ganze Welt; ich muss mich isolieren', label: 'KRISE – Akute moralische Zersetzung', description: 'Suizidgedanken möglich (Ekel vor der Existenz).', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Alles ist widerlich; ich kann nicht mehr atmen', label: 'NOTFALL – Extreme Verachtung', description: 'Akute psychische Gefährdung; Gewalt gegen Verachtete möglich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin von absolutem Widerwille erfüllt; die Welt muss fallen', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Fremdgefährdung möglich.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const socialAversionScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Diese Person gefällt mir; ich mag sie', label: 'Akzeptanz', description: 'Vollständige persönliche Akzeptanz; positive Beziehung; Vertrauen.' },
  { min: 10, max: 20, quote: 'Ich mag die Person, aber sie hat ihre Macken', label: 'Leichte Vorbehalte', description: 'Schwache Aversion; realistische Unterschiede.', recommendation: 'Bewusstsein für Grenzen in Beziehung' },
  { min: 20, max: 30, quote: 'Es gibt Momente, wo die Person mich irritiert; meist ist es okay', label: 'Leichter Widerwille', description: 'Milde Aversion in spezifischen Kontexten.', recommendation: 'Grenzensetzen; offene Kommunikation' },
  { min: 30, max: 40, quote: 'Die Person nervt mich regelmäßig; ich mag bestimmte Verhaltensweisen nicht', label: 'Regelmäßige Irritation', description: 'Widerwille gegen spezifisches Verhalten der Person.', recommendation: 'Grenzen klar kommunizieren; Kompromisse aushandeln' },
  { min: 40, max: 50, quote: 'Ich mag die Person zunehmend weniger; ich meide ihre Nähe', label: 'Distanzwunsch', description: 'Deutlich spürbar; Beziehung wird belastend; Kontaktwunsch sinkt.', recommendation: 'Beziehungstherapie; Kommunikations-Training' },
  { min: 50, max: 60, quote: 'Ich kann diese Person kaum ertragen; fast alles an ihr ekelt mich an', label: 'Ablehnung dominiert', description: 'Ausgeprägter Widerwille; Person wird als Ganzes abgelehnt.', recommendation: 'Psychotherapie; Ambivalenz-Arbeit', icon: 'warning' },
  { min: 60, max: 70, quote: 'Diese Person ist mir zuwider; ich verachte sie', label: 'Verachtung', description: 'Person wird entmenschlicht; alle Verhaltensweisen negativ interpretiert.', recommendation: 'Intensive Intervention; Realitätsprüfung erforderlich', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Diese Person ist giftig; ich kann nicht mit ihr sein; sie verdirbt meine Umgebung', label: 'Toxizität', description: 'Person wird als existenziell bedrohlich wahrgenommen.', recommendation: 'Therapeutische Intervention; Kontakt-Unterbrechung', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Diese Person ist ekelhaft; sie verdient Bestrafung; ich muss sie meiden/sabotieren', label: 'Menschenverachtung', description: 'Aktive Aggression/Sabotage möglich; Paranoia über Person.', recommendation: 'Sofort-Intervention; ggf. Kontakt-Sperre', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Diese Person ist mein Feind; sie muss eliminiert werden', label: 'AKUTER NOTFALL', description: 'Akute Fremdgefährdung; Wahngedanken; Obsession.', recommendation: 'Emergency-Services/Klinikaufnahme; Schutzmaßnahmen', icon: 'bolt' }
];

const selbstunsicherheitScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich weiß, wer ich bin; ich vertraue meinen Urteilen', label: 'Epistemische Sicherheit', description: 'Vollständige Selbstkenntnis; klare Werte; sichere Entscheidungsfähigkeit.' },
  { min: 10, max: 20, quote: 'Ich bin mir meist sicher, aber manchmal frage ich mich', label: 'Minimale Selbstunsicherheit', description: 'Schwaches Selbstzweifel-Signal; realistische Reflexion.', recommendation: 'Bewusstsein für Grenzen der Selbstkenntnis' },
  { min: 20, max: 30, quote: 'Ich bin mir nicht immer sicher, aber ich handle trotzdem', label: 'Leichte Selbstunsicherheit', description: 'Milde epistemische Unsicherheit; funktional.', recommendation: 'Selbstreflexion; Feedback einholen' },
  { min: 30, max: 40, quote: 'Ich bin mir unsicher, wer ich wirklich bin; meine Werte sind unklar', label: 'Identitätsfragen', description: 'Selbstunsicherheit als Entwicklungs-Signal.', recommendation: 'Identitäts-Exploration; Werteklarifikation' },
  { min: 40, max: 50, quote: 'Ich weiß nicht, wer ich bin; meine Gedanken/Gefühle sind mir fremd', label: 'Identitätsdiffusion', description: 'Deutlich spürbar; Dissoziation möglich; Entscheidungsunfähigkeit wächst.', recommendation: 'Grounding; Identitäts-Arbeit; Psychotherapie' },
  { min: 50, max: 60, quote: 'Ich bin mir selbst fremd; ich weiß nicht, was ich fühle oder will', label: 'Fragmentierte Identität', description: 'Ausgeprägter Identitätsverlust; Depersonalisierung; Verwirrung dominiert.', recommendation: 'Psychotherapie; Körper-Grounding; DBT', icon: 'warning' },
  { min: 60, max: 70, quote: 'Wer bin ich? Meine Identität existiert nicht; ich bin leer', label: 'Identitätskollaps', description: 'Existenzielle Leere; Orientierungsverlust; keine stabilen Bezüge.', recommendation: 'Intensive therapeutische Intervention; Somatische Therapie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Bin ich überhaupt eine Person? Mein Selbst ist aufgelöst', label: 'Psychotische Desintegration', description: 'Schwere Depersonalisierung/Derealisierung; Wahngedanken über Identität möglich.', recommendation: 'Therapeutische Intervention; Psychiatrie-Monitoring', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin nicht mehr ich; mein Bewusstsein zerfällt', label: 'Existenzielle Auflösung', description: 'Akute Depersonalisierungs-Krise; Suizidgedanken möglich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich existiere nicht; ich bin vollständig aufgelöst', label: 'AKUTER NOTFALL', description: 'Psychotische Desintegration; Bewusstseinsverlust; kompletter Funktionsverlust.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const unterlegenheitScale: IntensityLevel[] = [
  { min: 0, max: 10, quote: 'Ich bin meinen Aufgaben gewachsen; ich traue mir das zu', label: 'Selbstvertrauen', description: 'Vollständige Selbstwertschätzung; realistische Selbstbewertung; Kompetenzgefühl.' },
  { min: 10, max: 20, quote: 'Ich bin nicht perfekt, aber ich bin okay', label: 'Minimale Unterlegenheit', description: 'Schwaches Selbstzweifel-Signal; realistische Demut.', recommendation: 'Bewusstsein für Entwicklungspotenzial' },
  { min: 20, max: 30, quote: 'Ich bin nicht so gut wie andere, aber ich versuche', label: 'Leichte Unterlegenheit', description: 'Milde Selbstkritik; noch funktional.', recommendation: 'Selbstmitgefühl trainieren' },
  { min: 30, max: 35, quote: 'Ich bin weniger wert als andere; das schmerzt', label: 'Erkannte Unterlegenheit', description: 'Minderwertigkeitsgefühl; Warnsignal.', recommendation: 'Selbstwertaufbau; Vergleichsmechanismen hinterfragen' },
  { min: 35, max: 40, quote: 'Ich bin nicht gut genug; andere sind besser', label: 'Mäßige Unterlegenheit', description: 'Deutlich spürbar, aber noch funktional.', recommendation: 'Kognitive Umstrukturierung; Kompetenztraining' },
  { min: 40, max: 45, quote: 'Ich bin minderwertig; ich gehöre nicht dazu', label: 'Moderate Unterlegenheit', description: 'Ausgeprägtes Minderwertigkeitsgefühl.', recommendation: 'Psychotherapie; Selbstwert-Fokus' },
  { min: 45, max: 50, quote: 'Ich bin hoffnungslos inferior; warum bemühe ich mich?', label: 'Steigende Unterlegenheit', description: 'Starke Selbstabwertung; Motivation sinkt.', recommendation: 'Therapeutische Unterstützung; Zielorientierung' },
  { min: 50, max: 55, quote: 'Ich bin absolut unterlegen; ich bin ein Versager', label: 'WENDEPUNKT – Tiefe Unterlegenheit', description: 'Grenzfall zwischen Selbstkritik und Selbsthass.', recommendation: 'Psychologische Intervention sinnvoll', icon: 'warning' },
  { min: 55, max: 60, quote: 'Ich bin wertlos; ich verdiene besser zu sein', label: 'Sehr hohe Unterlegenheit', description: 'Intensive Selbstabwertung.', recommendation: 'Therapeutische Intervention erforderlich; Inferioritätskomplex', icon: 'warning' },
  { min: 60, max: 65, quote: 'Ich bin fundamentale minderwertig; alles ist meine Schuld', label: 'Kritische Unterlegenheit', description: 'Alltagsfunktion beeinträchtigt; Selbstverletzungsgedanken möglich.', recommendation: 'Therapeutische Intervention; Selbstmitleid-Arbeit', icon: 'bolt' },
  { min: 65, max: 70, quote: 'Ich bin ein Nichts; meine Existenz ist ein Fehler', label: 'Extreme Unterlegenheit', description: 'Hoffnungslosigkeit durch Unfähigkeitsgefühl.', recommendation: 'Professionelle Hilfe JETZT; Psychiatrie', icon: 'bolt' },
  { min: 70, max: 80, quote: 'Ich bin so unterlegen, dass ich nicht existieren sollte', label: 'KRISE – Akute Selbstvernichtung', description: 'Suizidgedanken möglich (Erlösung durch Tod).', recommendation: 'Unmittelbare Intervention erforderlich', icon: 'bolt' },
  { min: 80, max: 90, quote: 'Ich bin das Schlechteste; ich verdiene Bestrafung', label: 'NOTFALL – Extreme Selbsthass', description: 'Akute psychische Gefährdung; Selbstverletzung wahrscheinlich.', recommendation: 'Sofort-Intervention: Psychiatrie/Krisentelefon', icon: 'bolt' },
  { min: 90, max: 100, quote: 'Ich bin absolut wertlos; der Tod ist gerecht', label: 'AKUTER NOTFALL', description: 'Vollständige psychische Destabilisierung; Suizidalität.', recommendation: 'Emergency-Services/Klinikaufnahme', icon: 'bolt' }
];

const wutScale: IntensityLevel[] = [
  { min: 0, max: 5, quote: 'Es interessiert mich nicht, was passiert', label: 'Notfall: Dissoziation', description: 'Emotional abwesend; Verdrängung oder Trauma.', recommendation: 'Therapeut kontaktieren; Grounding-Techniken (5-Sinne-Übung)', icon: 'bolt' },
  { min: 5, max: 15, quote: 'Ich bin ruhig, aber es brodelt tief in mir', label: 'Völlig unterdrückt', description: 'Wut verdrängt; innere Spannung aufgestaut.', recommendation: 'Emotionsausdruckstraining; sichere Umgebung aufbauen; Wut-Journaling' },
  { min: 15, max: 25, quote: 'Mir gehts gut, aber irgendwie bin ich sauer', label: 'Leicht unterdrückt', description: 'Wut erkannt, aber heruntergeschluckt; Druck im Bauch.', recommendation: 'Wut-Journaling; Bewusstseinsübungen; Körperwahrnehmung trainieren' },
  { min: 25, max: 35, quote: 'Mich nervt das, aber ich kann damit umgehen', label: 'Leichte Reizbarkeit', description: 'Normal auf kleine Frustrationen; Situation noch überschaubar.', recommendation: 'Ruhe bewahren; tiefe Atemzüge; Perspektivwechsel' },
  { min: 35, max: 45, quote: 'Ich bin frustriert, aber ich bin noch ich selbst', label: 'Normal & gesund', description: 'Frustration klar erkannt; kognitiv noch klar; Problemlösungsdenken möglich.', recommendation: 'Grenzen rational setzen; konstruktives Gespräch führen; Ruhepausen einplanen' },
  { min: 45, max: 50, quote: 'Ich bin wirklich sauer, das MUSS aufhören', label: 'Grenzen setzen (rational)', description: 'Grenzverletzung deutlich erkannt; Wut kraftvoll, aber noch steuerbar.', recommendation: 'Grenzen AKTIV und deutlich kommunizieren; Konsequenzen artikulieren' },
  { min: 50, max: 60, quote: 'Meine Wut wird zu groß; ich verliere die Kontrolle', label: 'Aufmerksamkeit erforderlich', description: 'Rationale Kontrolle nimmt ab; Reizschwelle sinkt; Impulsivität steigt.', recommendation: 'TIMEOUT EINLEITEN: Raum verlassen (10–20 Min.); körperlich abreagieren', icon: 'warning' },
  { min: 60, max: 67, quote: 'Meine Wut wird zu groß; ich verliere Kontrolle', label: 'Akute Warnung – TIMEOUT', description: 'Präfrontaler Kortex deaktiviert; Amygdala Hijack beginnt.', recommendation: 'SOFORT RAUM VERLASSEN: Nicht diskutieren; Kaltwasser auf Gesicht', icon: 'bolt' },
  { min: 67, max: 75, quote: 'Meine Wut wird zu groß; ich könnte Gewalt zufügen', label: 'Kritisch – Ausbruchrisiko', description: 'Starke Muskelanspannung; Aggression sehr wahrscheinlich.', recommendation: 'SICHERHEITSPLAN AKTIVIEREN: Situation sofort verlassen; vertraute Person anrufen', icon: 'bolt' },
  { min: 75, max: 85, quote: 'Ich sehe rot; ich könnte jemanden anbrüllen', label: 'Aggressive Wut', description: 'Tobend; Zerstörungsdrang; kaum noch Bewusstseinskontrolle.', recommendation: 'EXTERNE INTERVENTION: Situation verlassen oder andere Person entfernen', icon: 'bolt' },
  { min: 85, max: 100, quote: 'Ich bin wahnsinnig; ich könnte jemanden verletzen', label: 'Extremwut/Gewalt – NOTFALL', description: 'Psychotische Züge möglich; Selbst-/Fremdgefährdung; vollständiger Kontrollverlust.', recommendation: 'POLIZEI/NOTFALL ANRUFEN (112): Person isolieren; nicht argumentieren', icon: 'bolt' }
];


// --- MAPPING ---

export const MOOD_DATA: (MoodCategory & { isSecondary?: boolean })[] = [
  {
    id: 'angst',
    name: 'Angst',
    icon: 'ShieldAlert',
    feelings: [
      { id: 'angst-basis', name: 'Angst', subGroup: 'Basis', composition: '.', intensities: angstScale },
      { id: 'furcht', name: 'Furcht', subGroup: 'Basis', composition: '.', intensities: angstScale },
      { 
        id: 'anspannung', 
        name: 'Anspannung', 
        subGroup: 'Körperliche Anspannung', 
        composition: '(Angst + körperliche Erregung)', 
        description: 'Anspannung beschreibt eine erhöhte psychische und körperliche Aktivierung. Sie entsteht oft durch Stress oder Angst und äußert sich durch Herzklopfen, Gedankenkreisen oder körperlichen Druck. Diese Skala hilft dir, dein aktuelles Erregungsniveau präzise einzuordnen und passende Gegenmaßnahmen zu finden.',
        intensities: distressScale 
      },
      { id: 'nervositaet', name: 'Nervosität', subGroup: 'Körperliche Anspannung', composition: '(Angst + Spannung + Unruhe)', intensities: nervositaetScale },
      { id: 'reue', name: 'Reue', subGroup: 'Moralische / innere Not', composition: '(Angst + Traurigkeit + Selbstvorwurf)', intensities: schuldScale },
      { id: 'schuld', name: 'Schuld', subGroup: 'Moralische / innere Not', composition: '(Angst + Traurigkeit + Reue)', intensities: schuldScale },
      { id: 'sorge', name: 'Sorge', subGroup: 'Moralische / innere Not', composition: '(Angst + Traurigkeit)', intensities: sorgeScale },
      { id: 'selbstunsicherheit', name: 'Selbstunsicherheit', subGroup: 'Unsicherheit über Sich', composition: '(Angst + kognitive Zweifel)', intensities: selbstunsicherheitScale },
      { id: 'unterlegenheit', name: 'Unterlegenheit', subGroup: 'Unsicherheit über Sich', composition: 'Scham + Trauer + Ohnmacht + Angst', intensities: unterlegenheitScale },
      { id: 'verlegenheit', name: 'Verlegenheit', subGroup: 'Unsicherheit über Sich', composition: '(Angst + Scham)', intensities: schamScale }
    ]
  },
  {
    id: 'freude',
    name: 'Freude',
    icon: 'Smile',
    feelings: [
      { id: 'aufregung', name: 'Aufregung', subGroup: 'Aktive Freude', composition: '(Angst + Freude)', intensities: freudeScale },
      { id: 'begeisterung', name: 'Begeisterung', subGroup: 'Aktive Freude', composition: '(Freude + Stolz + kognitive Wertung)', intensities: freudeScale },
      { id: 'leidenschaft', name: 'Leidenschaft', subGroup: 'Aktive Freude', composition: '(Freude + Lust + Liebe + Aktivierung)', intensities: freudeScale },
      { id: 'lust', name: 'Lust', subGroup: 'Aktive Freude', composition: '(Freude + körperliche Erregung)', intensities: freudeScale },
      { id: 'uebermut', name: 'Übermut', subGroup: 'Aktive Freude', composition: '(Freude + Stolz + kog. Wertung)', intensities: freudeScale },
      { id: 'erfuellung', name: 'Erfüllung', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + Zufriedenheit + Sinn)', intensities: freudeScale },
      { id: 'liebe', name: 'Liebe', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + Zärtlichkeit + Sicherheit + Vertrauen)', intensities: freudeScale },
      { id: 'ruehrung', name: 'Rührung', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + Traurigkeit)', intensities: freudeScale },
      { id: 'selbstvertrauen', name: 'Selbstvertrauen', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + kog. Wertung)', intensities: freudeScale },
      { id: 'stolz', name: 'Stolz', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + Selbstvertrauen)', intensities: freudeScale },
      { id: 'ueberlegenheit-f', name: 'Überlegenheit', subGroup: 'Bezug zu sich / anderen', composition: '.', intensities: freudeScale },
      { id: 'zuneigung', name: 'Zuneigung', subGroup: 'Bezug zu sich / anderen', composition: '(Freude + Liebe + Zärtlichkeit)', intensities: freudeScale },
      { id: 'freude-basis', name: 'Freude', subGroup: 'Bezug zu sich / anderen', composition: '.', intensities: freudeScale },
      { id: 'dankbarkeit', name: 'Dankbarkeit', subGroup: 'Innere Zufriedenheit', composition: '(Freude + Traurigkeit)', intensities: freudeScale },
      { id: 'gelassenheit', name: 'Gelassenheit', subGroup: 'Innere Zufriedenheit', composition: '.', intensities: freudeScale },
      { id: 'glueck', name: 'Glück', subGroup: 'Innere Zufriedenheit', composition: '(Freude + Zufriedenheit + Sicherheit)', intensities: freudeScale },
      { id: 'vertrauen', name: 'Vertrauen', subGroup: 'Innere Zufriedenheit', composition: '(Freude + Sicherheit + Glaube/Überzeugung)', intensities: freudeScale },
      { id: 'zufriedenheit', name: 'Zufriedenheit', subGroup: 'Innere Zufriedenheit', composition: '.', intensities: freudeScale }
    ]
  },
  {
    id: 'traurigkeit',
    name: 'Traurigkeit',
    icon: 'Frown',
    feelings: [
      { id: 'trauer-basis', name: 'Trauer', subGroup: 'Basis', composition: '.', intensities: traurigkeitScale },
      { id: 'verzweiflung', name: 'Verzweiflung', subGroup: 'Basis', composition: '(Traurigkeit + Angst)', intensities: verzweiflungScale },
      { id: 'einsamkeit', name: 'Einsamkeit', subGroup: 'Mangel an Nähe / Sinn', composition: '(Traurigkeit + Angst + Sehnsucht + Leere)', intensities: einsamkeitScale },
      { id: 'langeweile', name: 'Langeweile', subGroup: 'Mangel an Nähe / Sinn', composition: '(Traurigkeit + Mangel an Stimulation)', intensities: traurigkeitScale },
      { id: 'leere', name: 'Leere', subGroup: 'Mangel an Nähe / Sinn', composition: '.', intensities: traurigkeitScale },
      { id: 'sehnsucht', name: 'Sehnsucht', subGroup: 'Mangel an Nähe / Sinn', composition: '(Traurigkeit + Vermissen)', intensities: sehnsuchtScale },
      { id: 'verlassenheit', name: 'Verlassenheit', subGroup: 'Mangel an Nähe / Sinn', composition: '(Traurigkeit + Einsamkeit)', intensities: einsamkeitScale },
      { id: 'beleidigt', name: 'Beleidigt sein', subGroup: 'Reaktion auf Ereignisse', composition: '(Traurigkeit + Anger/Wut)', intensities: traurigkeitScale },
      { id: 'enttaeuschung', name: 'Enttäuschung', subGroup: 'Reaktion auf Ereignisse', composition: '(Traurigkeit + Ärger/Wut)', intensities: traurigkeitScale },
      { id: 'mitgefuehl', name: 'Mitgefühl', subGroup: 'Reaktion auf Ereignisse', composition: '.', intensities: traurigkeitScale }
    ]
  },
  {
    id: 'wut',
    name: 'Wut / Ärger',
    icon: 'Flame',
    feelings: [
      { id: 'abneigung', name: 'Abneigung', subGroup: 'Ablehnung Anderer', composition: '(Ärger + Ablehnung)', intensities: socialAversionScale },
      { id: 'hass', name: 'Hass', subGroup: 'Ablehnung Anderer', composition: '(Wut/Ärger + Angst + Verachtung)', intensities: socialAversionScale },
      { id: 'verachtung', name: 'Verachtung', subGroup: 'Ablehnung Anderer', composition: '(Wut/Ärger + kognitive Wertung)', intensities: socialAversionScale },
      { id: 'aerger-basis', name: 'Ärger', subGroup: 'Offener Ärger', composition: '.', intensities: wutScale },
      { id: 'missmut', name: 'Missmut', subGroup: 'Offener Ärger', composition: '(Wut/Ärger + Traurigkeit)', intensities: wutScale },
      { id: 'trotz', name: 'Trotz', subGroup: 'Offener Ärger', composition: '(Wut/Ärger + Angst)', intensities: wutScale },
      { id: 'ungeduld', name: 'Ungeduld', subGroup: 'Offener Ärger', composition: '(Wut/Ärger + Angst)', intensities: wutScale },
      { id: 'wut-basis', name: 'Wut', subGroup: 'Offener Ärger', composition: '.', intensities: wutScale },
      { id: 'zorn', name: 'Zorn', subGroup: 'Offener Ärger', composition: '.', intensities: wutScale },
      { id: 'eifersucht', name: 'Eifersucht', subGroup: 'Vergleich mit Anderen', composition: '(Wut/Ärger + Angst + Traurigkeit)', intensities: wutScale },
      { id: 'neid', name: 'Neid', subGroup: 'Vergleich mit Anderen', composition: '(Wut/Ärger + Angst)', intensities: wutScale }
    ]
  },
  {
    id: 'scham',
    name: 'Scham',
    icon: 'UserX',
    isSecondary: true,
    feelings: [
      { id: 'scham-basis', name: 'Scham', subGroup: 'Scham', composition: '(Angst + Traurigkeit)', intensities: schamScale },
      { id: 'verlegen-s', name: 'Verlegenheit', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'befangen', name: 'Befangenheit', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'schuechtern', name: 'Schüchternheit', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'peinlich', name: 'Peinlichkeit', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'kraenkung', name: 'Kränkung', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'schmach', name: 'Schmach', subGroup: 'Scham', composition: '.', intensities: schamScale },
      { id: 'minderwert', name: 'Minderwertigkeit', subGroup: 'Scham', composition: '.', intensities: schamScale }
    ]
  },
  {
    id: 'ohnmacht-cat',
    name: 'Ohnmacht',
    icon: 'CloudRain',
    isSecondary: true,
    feelings: [
      { id: 'ohnmacht-basis', name: 'Ohnmacht', subGroup: 'Basis', composition: 'Verzweiflung + Hoffnungslosigkeit + Wut', intensities: ohnmachtScale }
    ]
  },
  {
    id: 'misstrauen-cat',
    name: 'Misstrauen',
    icon: 'ScanSearch',
    isSecondary: true,
    feelings: [
      { id: 'misstrauen-basis', name: 'Misstrauen', subGroup: 'Basis', composition: '(Wut/Ärger + Angst)', intensities: misstrauenScale }
    ]
  },
  {
    id: 'ekel-cat',
    name: 'Ekel',
    icon: 'OctagonX',
    isSecondary: true,
    feelings: [
      { id: 'ekel-basis', name: 'Ekel', subGroup: 'Basis', composition: '.', intensities: ekelScale }
    ]
  },
  {
    id: 'widerwille-cat',
    name: 'Widerwille',
    icon: 'Ban',
    isSecondary: true,
    feelings: [
      { id: 'wider-moral', name: 'Wertverletzung', subGroup: 'Moralisch', composition: '.', intensities: widerwilleScale },
      { id: 'wider-koerper', name: 'Physiologische Aversion', subGroup: 'Körperlich', composition: '.', intensities: widerwilleScale },
      { id: 'wider-sozial', name: 'Soziale Norm-Verletzung', subGroup: 'Sozial', composition: '.', intensities: widerwilleScale },
      { id: 'wider-sex', name: 'Sexuelle Grenzverletzung', subGroup: 'Sexuell', composition: '.', intensities: widerwilleScale },
      { id: 'wider-aesthet', name: 'Schönheits-/Geschmacksverletzung', subGroup: 'Ästhetisch', composition: '.', intensities: widerwilleScale }
    ]
  },
  {
    id: 'hypervigilanz-cat',
    name: 'Hypervigilanz',
    icon: 'Eye',
    isSecondary: true,
    feelings: [
      { id: 'hyper-over', name: 'Hypervigilanz + Overarousal', subGroup: 'Hypervigilanz + Overarousal', composition: '.', intensities: hypervigilanzScale },
      { id: 'hyper-epist', name: 'Epistemische Hyper-Vigilanz', subGroup: 'Hypervigilanz + Overarousal', composition: '.', intensities: epistemicScale },
      { id: 'hyper-antrieb', name: 'Antrieb', subGroup: 'Hypervigilanz + Overarousal', composition: '.', intensities: antriebScale },
      { id: 'hyper-vermeidung', name: 'Vermeidung', subGroup: 'Hypervigilanz + Overarousal', composition: '.', intensities: vermeidungScale }
    ]
  }
];
