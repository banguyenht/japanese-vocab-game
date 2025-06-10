import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/next"
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import FlashcardQuizGame from "./games/FlashcardQuizGame";
import TypingPracticeGame from "./games/TypingPracticeGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="quiz/:lessonId" element={<FlashcardQuizGame />} />
          <Route path="typing/:lessonId" element={<TypingPracticeGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
