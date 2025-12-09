import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'peashooter',
    name: '豌豆射手',
    emoji: '🌱',
    color: 'text-green-600',
  },
  {
    id: 'minion',
    name: '小黄人',
    emoji: '👾',
    color: 'text-yellow-600',
  },
  {
    id: 'ultraman',
    name: '奥特曼',
    emoji: '🦸',
    color: 'text-red-600',
  },
  {
    id: 'snowwhite',
    name: '白雪公主',
    emoji: '👸',
    color: 'text-pink-600',
  },
  {
    id: 'elsa',
    name: '艾莎公主',
    emoji: '❄️',
    color: 'text-blue-400',
  },
  {
    id: 'custom',
    name: '自定义',
    emoji: '✨',
    color: 'text-purple-600',
  },
];

export const getCharacterById = (id: string): Character => {
  return characters.find(c => c.id === id) || characters[0];
};
