import { useState } from 'react';
import { User, ChevronRight, Calculator, Eye, EyeOff } from 'lucide-react';

type ProblemType = '1' | '2' | '3';

interface QueueState {
  type: ProblemType;
  frontValue: number;
  backValue: number;
}

function App() {
  const [queue, setQueue] = useState<QueueState>({
    type: '1',
    frontValue: 3,
    backValue: 4,
  });
  const [showAnswer, setShowAnswer] = useState(false);

  const problemTypes = [
    {
      id: '1' as ProblemType,
      title: '两个"有几"',
      description: '前面有几人，后面有几人',
      formula: '前 + 后 + 1',
      reason: '主角（自己）还没算进去，要加上',
      example: '前面有3人，后面有4人',
      frontLabel: '前面有',
      backLabel: '后面有',
      unit: '人',
    },
    {
      id: '2' as ProblemType,
      title: '两个"第几"',
      description: '从前数第几，从后数第几',
      formula: '前 + 后 - 1',
      reason: '主角被数了两次（多数了一次），要减掉',
      example: '从前数第3，从后数第4',
      frontLabel: '从前数第',
      backLabel: '从后数第',
      unit: '',
    },
    {
      id: '3' as ProblemType,
      title: '一个"第几"，一个"有几"',
      description: '从前数第几，后面有几人',
      formula: '第几 + 后面人数',
      reason: '"第几"已经包含了主角，后面人数不包含主角，直接相加即可',
      example: '从前数第3，后面有4人',
      frontLabel: '从前数第',
      backLabel: '后面有',
      unit: '人',
    },
  ];

  const currentProblem = problemTypes.find((p) => p.id === queue.type)!;

  const calculateTotal = (): number => {
    switch (queue.type) {
      case '1':
        return queue.frontValue + queue.backValue + 1;
      case '2':
        return queue.frontValue + queue.backValue - 1;
      case '3':
        return queue.frontValue + queue.backValue;
      default:
        return 0;
    }
  };

  const total = calculateTotal();

  const renderQueue = () => {
    const people = [];
    const mainPersonIndex = queue.type === '1' ? queue.frontValue : queue.frontValue - 1;

    for (let i = 0; i < total; i++) {
      const isMainPerson = i === mainPersonIndex;
      const isFrontSection = i < mainPersonIndex;
      const isBackSection = i > mainPersonIndex;

      people.push(
        <div
          key={i}
          className={`relative flex flex-col items-center transition-all duration-300 border-none ${
            isMainPerson ? 'scale-110' : 'scale-100'
          }`}
        >
          <div
            className={`relative ${
              isMainPerson
                ? 'text-rose-500'
                : isFrontSection
                ? 'text-blue-500'
                : 'text-emerald-500'
            }`}
          >
            <User
              size={isMainPerson ? 48 : 40}
              fill="currentColor"
              strokeWidth={1.5}
            />
            {isMainPerson && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
                主角
              </div>
            )}
          </div>
          <span className="text-xs mt-1 font-medium text-gray-600">{i + 1}</span>
        </div>
      );
    }

    return people;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            排队问题可视化
          </h1>
          <p className="text-lg text-gray-600">
            通过动画直观理解三种排队计算题型
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-2 mb-10">
          <div className="flex flex-wrap gap-2">
            {problemTypes.map((problem) => (
              <button
                key={problem.id}
                onClick={() => {
                  setQueue({ ...queue, type: problem.id });
                  setShowAnswer(false);
                }}
                className={`flex-1 min-w-[180px] px-4 py-3 rounded-xl text-center transition-all duration-200 font-semibold ${
                  queue.type === problem.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="text-base">{problem.title}</div>
                <div className={`text-xs mt-1 ${queue.type === problem.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {problem.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">
              {currentProblem.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 whitespace-nowrap">
                {currentProblem.frontLabel}
              </label>
              <select
                value={queue.frontValue}
                onChange={(e) =>
                  setQueue({
                    ...queue,
                    frontValue: parseInt(e.target.value),
                  })
                }
                className="w-20 px-3 py-2 text-center text-lg font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"
              >
                {Array.from({ length: 19 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {currentProblem.unit && <span className="text-gray-600">{currentProblem.unit}</span>}
            </div>

            <span className="text-gray-400 hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 whitespace-nowrap">
                {currentProblem.backLabel}
              </label>
              <select
                value={queue.backValue}
                onChange={(e) =>
                  setQueue({
                    ...queue,
                    backValue: parseInt(e.target.value),
                  })
                }
                className="w-20 px-3 py-2 text-center text-lg font-bold border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white cursor-pointer"
              >
                {Array.from({ length: 19 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {currentProblem.unit && <span className="text-gray-600">{currentProblem.unit}</span>}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full flex items-center justify-between gap-3 mb-4 px-4 py-3 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
            >
              <span className="text-lg font-bold text-gray-900">
                {showAnswer ? '隐藏答案和列式' : '查看答案和列式'}
              </span>
              {showAnswer ? (
                <EyeOff className="text-gray-600" size={24} />
              ) : (
                <Eye className="text-blue-600" size={24} />
              )}
            </button>

            {showAnswer && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-wrap items-center justify-center gap-4 text-lg font-semibold">
                  <span className="text-blue-600">{queue.frontValue}</span>
                  <span className="text-gray-400">+</span>
                  <span className="text-emerald-600">{queue.backValue}</span>
                  {queue.type === '1' && (
                    <>
                      <span className="text-gray-400">+</span>
                      <span className="text-rose-600">1</span>
                    </>
                  )}
                  {queue.type === '2' && (
                    <>
                      <span className="text-gray-400">-</span>
                      <span className="text-rose-600">1</span>
                    </>
                  )}
                  <span className="text-gray-400">=</span>
                  <span className="text-2xl font-bold text-gray-900">{total}</span>
                  <span className="text-gray-600">人</span>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-bold text-blue-700">为什么？</span>{' '}
                    {currentProblem.reason}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-rose-50 to-emerald-50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <ChevronRight className="text-gray-600" size={24} />
              <h3 className="text-xl font-bold text-gray-900">队伍可视化</h3>
            </div>

            <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4 min-h-[120px]">
              {renderQueue()}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-100 rounded-lg p-3 text-center border-none">
                <User size={24} className="text-blue-500 mx-auto mb-1" fill="currentColor" />
                <p className="text-xs font-semibold text-blue-700">前面的人</p>
                <p className="text-lg font-bold text-blue-900">{queue.frontValue}</p>
              </div>

              <div className="bg-rose-100 rounded-lg p-3 text-center border-none">
                <User size={32} className="text-rose-500 mx-auto mb-1" fill="currentColor" />
                <p className="text-xs font-semibold text-rose-700">主角（自己）</p>
                <p className="text-lg font-bold text-rose-900">1</p>
              </div>

              <div className="bg-emerald-100 rounded-lg p-3 text-center border-none">
                <User size={24} className="text-emerald-500 mx-auto mb-1" fill="currentColor" />
                <p className="text-xs font-semibold text-emerald-700">后面的人</p>
                <p className="text-lg font-bold text-emerald-900">{queue.backValue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">题型总结</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-bold text-gray-700 border-b-2">
                    题型描述
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700 border-b-2">
                    解题口诀
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700 border-b-2">
                    计算公式
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700 border-b-2">
                    为什么？
                  </th>
                </tr>
              </thead>
              <tbody>
                {problemTypes.map((problem, index) => (
                  <tr
                    key={problem.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3 border-b">
                      <div className="font-semibold text-gray-900">{problem.title}</div>
                      <div className="text-xs text-gray-600">{problem.description}</div>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      {problem.title}
                      {problem.id === '1' && '加自己'}
                      {problem.id === '2' && '减自己'}
                      {problem.id === '3' && (
                        <span className="block">不加不减正常算</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b font-mono font-semibold text-blue-600">
                      {problem.formula}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700 text-xs">
                      {problem.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
