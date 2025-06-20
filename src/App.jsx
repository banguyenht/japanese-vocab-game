import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import FlashcardQuizGame from "./games/FlashcardQuizGame";
import TypingPracticeGame from "./games/TypingPracticeGame";
import AuthForm from "./components/AuthForm";
import Login from "./pages/Login"; 
import CreateLesson from "./pages/CreateLesson";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import EditLessonPage from "./pages/EditLessonPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="quiz/:lessonId" element={<FlashcardQuizGame />} />
          <Route path="typing/:lessonId" element={<TypingPracticeGame />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tao-tu-vung-tieng-nhat" element={<CreateLesson />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/sua-tu-vung-tieng-nhat/:id" element={<EditLessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
