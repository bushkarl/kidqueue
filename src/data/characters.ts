import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'boy',
    name: '小男孩',
    imageUrl: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=200',
    color: 'border-blue-400',
  },
  {
    id: 'girl',
    name: '小女孩',
    imageUrl: 'https://images.pexels.com/photos/1624695/pexels-photo-1624695.jpeg?auto=compress&cs=tinysrgb&w=200',
    color: 'border-pink-400',
  },
  {
    id: 'astronaut',
    name: '宇航员',
    imageUrl: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=200',
    color: 'border-purple-400',
  },
  {
    id: 'doctor',
    name: '小医生',
    imageUrl: 'https://images.pexels.com/photos/6393342/pexels-photo-6393342.jpeg?auto=compress&cs=tinysrgb&w=200',
    color: 'border-green-400',
  },
  {
    id: 'custom',
    name: '自定义',
    imageUrl: '',
    color: 'border-gray-400',
  },
];

export const getCharacterById = (id: string): Character => {
  return characters.find(c => c.id === id) || characters[0];
};
