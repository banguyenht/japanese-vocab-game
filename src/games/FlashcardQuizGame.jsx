import React, { useEffect, useState } from "react";
import { loadCSV } from "../utils/loadCSV";
import vocabCSV from "../data/lession40.csv?url";

import QuizQuestion from "./QuizQuestion";
import QuizOptions from "./QuizOptions";
import NavigationButtons from "./NavigationButtons";

import { useParams } from "react-router-dom";


function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function FlashcardQuizGame() {
  const { lessonId } = useParams();
  console.log("lessonId:", lessonId);

  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    fetch(vocabCSV)
      .then((res) => res.text())
      .then((text) => loadCSV(text))
      .then((data) => {
        setVocabList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (vocabList.length === 0) return;

    const question = vocabList[questionIndex];
    const correct = question.meaning;

    const wrongOptions = shuffle(
      vocabList
        .filter((item, idx) => idx !== questionIndex)
        .map((item) => item.meaning)
    ).slice(0, 3);

    const allOptions = shuffle([correct, ...wrongOptions]);

    setCorrectAnswer(correct);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowNext(false);
  }, [vocabList, questionIndex]);

  const handleAnswer = (selected) => {
    if (selectedAnswer) return;
    setSelectedAnswer(selected);
    setShowNext(true);
  };

  const handleNext = () => {
    setQuestionIndex((prev) => (prev + 1) % vocabList.length);
  };

  const handlePrev = () => {
    setQuestionIndex((prev) => (prev === 0 ? vocabList.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code !== "Enter" && e.code !== "Space") return;
      e.preventDefault();

      if (selectedAnswer) {
        handleNext();
      } else {
        // Nếu chưa chọn thì phát âm từ vựng
        if (vocabList.length > 0) {
          const currentVocab = vocabList[questionIndex].vocab;
          if (currentVocab) {
            const utterance = new SpeechSynthesisUtterance(currentVocab);
            utterance.lang = "ja-JP";
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnswer, questionIndex, vocabList]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Đang tải từ vựng...</p>
      </div>
    );

  const question = vocabList[questionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          🎌 Câu {questionIndex + 1}: Nghĩa của từ?
        </h2>

        <QuizQuestion question={question} />

        <QuizOptions
          options={options}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswer}
        />

        {showNext && (
          <NavigationButtons
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
