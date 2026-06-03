export interface Choice {
  text: string;
  nextNodeId: string;
  costPA: number;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  expression: string; // ex: 'sorrindo', 'bravo', 'triste', 'neutro', 'none'
  characterName: string; // ex: 'Castiel', 'Nathaniel', 'Diretora', 'Narrador'
  backgroundUrl: string;
  text: string;
  choices?: Choice[];
  next?: string;
}
