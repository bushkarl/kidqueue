import { useState } from 'react';
import { CharacterId } from '../types';
import { characters } from '../data/characters';

interface CharacterSelectorProps {
  selectedId: CharacterId;
  customName: string;
  onSelectCharacter: (id: CharacterId) => void;
  onCustomNameChange: (name: string) => void;
}

export function CharacterSelector({
  selectedId,
  customName,
  onSelectCharacter,
  onCustomNameChange,
}: CharacterSelectorProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎭</span>
        选择你的角色
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => {
              onSelectCharacter(character.id);
              if (character.id === 'custom') {
                setIsEditing(true);
              } else {
                setIsEditing(false);
              }
            }}
            className={`relative p-3 rounded-xl border-3 transition-all duration-200 ${
              selectedId === character.id
                ? `${character.color} border-4 bg-blue-50 shadow-lg scale-105`
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {character.imageUrl ? (
              <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center border-2 border-purple-300">
                <span className="text-3xl">✨</span>
              </div>
            )}
            <div className="text-sm font-semibold text-gray-900">
              {character.name}
            </div>
          </button>
        ))}
      </div>

      {selectedId === 'custom' && (
        <div className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            输入你的角色名字：
          </label>
          <input
            type="text"
            value={customName}
            onChange={(e) => onCustomNameChange(e.target.value)}
            placeholder="例如：小明、小红..."
            maxLength={10}
            autoFocus={isEditing}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg font-semibold"
          />
        </div>
      )}
    </div>
  );
}
