import { Scene } from '../types';

export const scenes: Scene[] = [
  {
    id: 'exercise',
    name: '排队做操',
    emoji: '🤸',
    bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
    description: '早上在操场排队做早操',
  },
  {
    id: 'lunch',
    name: '排队打饭',
    emoji: '🍱',
    bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',
    description: '中午在食堂排队打饭',
  },
  {
    id: 'cinema',
    name: '电影院入场',
    emoji: '🎬',
    bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
    description: '在电影院门口排队检票',
  },
  {
    id: 'playground',
    name: '游乐场排队',
    emoji: '🎡',
    bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
    description: '在游乐场排队玩项目',
  },
];

export const getSceneById = (id: string): Scene => {
  return scenes.find(s => s.id === id) || scenes[0];
};
