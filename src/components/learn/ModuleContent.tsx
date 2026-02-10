"use client";

import { useState } from "react";
import type { ModuleData } from "@/types";
import ProgressBar from "@/components/ui/ProgressBar";

interface ModuleContentProps {
  module: ModuleData;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function ModuleContent({ module, isCompleted, onComplete }: ModuleContentProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const totalSections = module.content.length;

  function handleQuizAnswer(questionIndex: number, answerIndex: number) {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  }

  function submitQuiz() {
    setQuizSubmitted(true);
  }

  function getQuizScore() {
    if (!module.quiz) return 0;
    let correct = 0;
    module.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctAnswer) correct++;
    });
    return correct;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <span>{module.sectionTitle}</span>
          <span>-</span>
          <span>Module {module.id}</span>
          <span>-</span>
          <span>{module.estimatedTime} min</span>
          {isCompleted && (
            <span className="ml-auto bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded text-xs">
              Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{module.title}</h1>
        <p className="text-gray-400">{module.description}</p>
      </div>

      {/* Progress */}
      {!showQuiz && (
        <div className="mb-6">
          <ProgressBar
            value={currentSection + 1}
            max={totalSections}
            label={`Section ${currentSection + 1} of ${totalSections}`}
          />
        </div>
      )}

      {/* Content */}
      {!showQuiz ? (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-200 leading-relaxed text-lg">
              {module.content[currentSection]}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentSection((prev) => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-40 hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-1.5">
              {module.content.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSection(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentSection ? "bg-emerald-500" : i <= currentSection ? "bg-emerald-700" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {currentSection < totalSections - 1 ? (
              <button
                onClick={() => setCurrentSection((prev) => prev + 1)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Next
              </button>
            ) : module.quiz && module.quiz.length > 0 ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Take Quiz
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Complete Module
              </button>
            )}
          </div>

          {/* Key Points */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">
              Key Points
            </h3>
            <ul className="space-y-2">
              {module.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-emerald-500 mt-0.5">&#10003;</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Quiz */
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Knowledge Check</h2>
            <p className="text-gray-400 mb-6">
              Answer the following questions to test your understanding.
            </p>

            {module.quiz?.map((q, qi) => (
              <div key={qi} className="mb-8 last:mb-0">
                <p className="text-white font-medium mb-3">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = q.correctAnswer === oi;
                    let optionClass = "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600";
                    if (quizSubmitted) {
                      if (isCorrect) optionClass = "bg-emerald-900/50 border-emerald-500 text-emerald-300";
                      else if (isSelected && !isCorrect) optionClass = "bg-red-900/50 border-red-500 text-red-300";
                    } else if (isSelected) {
                      optionClass = "bg-cyan-900/50 border-cyan-500 text-cyan-300";
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => handleQuizAnswer(qi, oi)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${optionClass}`}
                      >
                        <span className="font-mono text-sm mr-2">
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="mt-3 text-sm text-gray-400 bg-gray-700/50 p-3 rounded-lg">
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Content
            </button>

            {!quizSubmitted ? (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < (module.quiz?.length || 0)}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-40 transition-colors"
              >
                Submit Answers
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Score: {getQuizScore()}/{module.quiz?.length}
                  {getQuizScore() === module.quiz?.length && " - Perfect!"}
                </span>
                <button
                  onClick={onComplete}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Complete Module
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
