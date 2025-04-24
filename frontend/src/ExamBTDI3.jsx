import React, { useState, useEffect } from 'react';
import styles from './ExamBTDS.module.css';
import questionsData from './preguntasbtdi3.json'; // Asegúrate de usar el archivo correcto

function ExamBTDI3() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const subjects = Object.keys(questionsData);

  useEffect(() => {
    if (selectedSubject) {
      const questions = questionsData[selectedSubject] || [];
      setCurrentQuestions(questions);
      setUserAnswers({});
      setShowResults(false);
      console.log("Preguntas actualizadas para:", selectedSubject, questions);
    }
  }, [selectedSubject]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const correctAnswersCount = currentQuestions.reduce((count, question, index) => {
    return count + (userAnswers[index] === question.answer ? 1 : 0);
  }, 0);

  return (
    <div className={styles["app-container"]}>
      <h1 className={styles["title"]}>Cuestionario Académico - BTDI</h1>

      <div className={styles["subject-selector"]}>
        <select 
          value={selectedSubject} 
          onChange={handleSubjectChange}
          className={styles["subject-dropdown"]}
        >
          <option value="">-- Selecciona una materia --</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {selectedSubject && (
        <div className={styles["questions-section"]}>
          {currentQuestions.map((question, qIndex) => (
            <div key={qIndex} className={styles["question-card"]}>
              <h3 className={styles["question-text"]}>{qIndex + 1}. {question.question}</h3>
              <div className={styles["options-container"]}>
                {question.options.map((option, oIndex) => (
                  <div 
                    key={oIndex} 
                    className={`${styles["option"]} ${
                      showResults 
                        ? oIndex === question.answer 
                          ? styles["correct"] 
                          : userAnswers[qIndex] === oIndex 
                            ? styles["incorrect"] 
                            : ''
                        : userAnswers[qIndex] === oIndex 
                          ? styles["selected"] 
                          : ''
                    }`}
                    onClick={() => !showResults && handleAnswerSelect(qIndex, oIndex)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!showResults && (
            <button 
              className={styles["submit-button"]}
              onClick={calculateResults}
              disabled={Object.keys(userAnswers).length < currentQuestions.length}
            >
              Ver Resultados
            </button>
          )}

          {showResults && (
            <div className={styles["results-container"]}>
              <h3>Tu puntuación</h3>
              <p>Correctas: {correctAnswersCount} / Total: {currentQuestions.length}</p>
            </div>
          )}
          {/* Botón para salir del examen */}
                      <div className={styles["exit-section"]}>
                        <button 
                          className={styles["exit-button"]}
                          onClick={goToExams} // Llamamos a la función para ir a la pestaña de Exams
                       >
                          Salir del Examen
                        </button>
                     </div>
        </div>
      )}
    </div>
  );
}

export default ExamBTDI3;