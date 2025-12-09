import { SceneId } from '../types';
import { scenes } from '../data/scenes';

interface SceneSelectorProps {
  selectedId: SceneId;
  onSelectScene: (id: SceneId) => void;
}

export function SceneSelector({ selectedId, onSelectScene }: SceneSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎬</span>
        选择排队场景
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSelectScene(scene.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedId === scene.id
                ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="text-4xl mb-2">{scene.emoji}</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              {scene.name}
            </div>
            <div className="text-xs text-gray-600">
              {scene.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
