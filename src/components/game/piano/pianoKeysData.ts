export interface PianoKeyData {
  note: string;
  type: 'white' | 'black';
  keyboardBinding: string;
  audioSrc: string; // we will load these dynamically or assume they are in /audio/piano/
}

export const pianoKeysData: PianoKeyData[] = [
  { note: 'C4', type: 'white', keyboardBinding: 'a', audioSrc: '/audio/piano/C4.mp3' },
  { note: 'C#4', type: 'black', keyboardBinding: 'w', audioSrc: '/audio/piano/Cs4.mp3' },
  { note: 'D4', type: 'white', keyboardBinding: 's', audioSrc: '/audio/piano/D4.mp3' },
  { note: 'D#4', type: 'black', keyboardBinding: 'e', audioSrc: '/audio/piano/Ds4.mp3' },
  { note: 'E4', type: 'white', keyboardBinding: 'd', audioSrc: '/audio/piano/E4.mp3' },
  { note: 'F4', type: 'white', keyboardBinding: 'f', audioSrc: '/audio/piano/F4.mp3' },
  { note: 'F#4', type: 'black', keyboardBinding: 't', audioSrc: '/audio/piano/Fs4.mp3' },
  { note: 'G4', type: 'white', keyboardBinding: 'g', audioSrc: '/audio/piano/G4.mp3' },
  { note: 'G#4', type: 'black', keyboardBinding: 'y', audioSrc: '/audio/piano/Gs4.mp3' },
  { note: 'A4', type: 'white', keyboardBinding: 'h', audioSrc: '/audio/piano/A4.mp3' },
  { note: 'A#4', type: 'black', keyboardBinding: 'u', audioSrc: '/audio/piano/As4.mp3' },
  { note: 'B4', type: 'white', keyboardBinding: 'j', audioSrc: '/audio/piano/B4.mp3' },
  { note: 'C5', type: 'white', keyboardBinding: 'k', audioSrc: '/audio/piano/C5.mp3' },
  { note: 'C#5', type: 'black', keyboardBinding: 'o', audioSrc: '/audio/piano/Cs5.mp3' },
  { note: 'D5', type: 'white', keyboardBinding: 'l', audioSrc: '/audio/piano/D5.mp3' },
  { note: 'D#5', type: 'black', keyboardBinding: 'p', audioSrc: '/audio/piano/Ds5.mp3' },
  { note: 'E5', type: 'white', keyboardBinding: 'z', audioSrc: '/audio/piano/E5.mp3' },
  { note: 'F5', type: 'white', keyboardBinding: 'x', audioSrc: '/audio/piano/F5.mp3' },
  { note: 'F#5', type: 'black', keyboardBinding: 'c', audioSrc: '/audio/piano/Fs5.mp3' },
];

export interface SheetMusic {
  id: string;
  title: string;
  notes: string[];
}

export const availableSheetMusic: SheetMusic[] = [
  {
    id: 'melody_veronica_theme',
    title: 'Tema da Veronica',
    notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4']
  },
  {
    id: 'melody_secret',
    title: 'Aeris Theme (Secreta)',
    notes: ['A4', 'D5', 'C#5', 'D5', 'F#5', 'D5', 'A4', 'F#4']
  }
];
