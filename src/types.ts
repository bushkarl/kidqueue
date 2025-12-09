export type ProblemType = '1' | '2' | '3';

export type CharacterId = 'peashooter' | 'minion' | 'ultraman' | 'snowwhite' | 'elsa' | 'custom';

export interface Character {
  id: CharacterId;
  name: string;
  emoji: string;
  color: string;
}

export type SceneId = 'exercise' | 'lunch' | 'cinema' | 'playground';

export interface Scene {
  id: SceneId;
  name: string;
  emoji: string;
  bgGradient: string;
  description: string;
}

export interface QueueState {
  type: ProblemType;
  frontValue: number;
  backValue: number;
}

export interface UserPreferences {
  characterId: CharacterId;
  customCharacterName: string;
  sceneId: SceneId;
}
