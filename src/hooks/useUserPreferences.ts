import { useState, useEffect } from 'react';
import { CharacterId, SceneId, UserPreferences } from '../types';

const STORAGE_KEY = 'queue_visualizer_preferences';

const defaultPreferences: UserPreferences = {
  characterId: 'peashooter',
  customCharacterName: '',
  sceneId: 'exercise',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updateCharacter = (characterId: CharacterId) => {
    setPreferences((prev) => ({ ...prev, characterId }));
  };

  const updateCustomName = (customCharacterName: string) => {
    setPreferences((prev) => ({ ...prev, customCharacterName }));
  };

  const updateScene = (sceneId: SceneId) => {
    setPreferences((prev) => ({ ...prev, sceneId }));
  };

  return {
    preferences,
    updateCharacter,
    updateCustomName,
    updateScene,
  };
}
