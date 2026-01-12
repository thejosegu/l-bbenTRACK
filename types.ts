
export interface IntensityLevel {
  min: number;
  max: number;
  quote: string;
  label?: string; // Fachliche Bezeichnung (z.B. "Krise", "Normbereich")
  description?: string; // Was gerade passiert
  recommendation?: string; // Was zu tun ist
  icon?: string; // e.g., 'star', 'warning', 'bolt'
}

export interface Feeling {
  id: string;
  name: string;
  subGroup?: string;
  composition?: string;
  description?: string;
  intensities: IntensityLevel[];
}

export interface MoodCategory {
  id: string;
  name: string;
  icon: string;
  feelings: Feeling[];
}

export interface MoodEntry {
  id: string;
  timestamp: number;
  categoryId: string;
  categoryName: string;
  feelingId: string;
  feelingName: string;
  intensity: number;
  quote: string;
  label?: string;
  description?: string;
  recommendation?: string;
  note?: string;
}
