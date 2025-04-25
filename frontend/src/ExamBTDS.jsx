import React, { useState } from 'react';

import styles from './ExamBTDS.module.css'; // Importar estilos como módulo
import questionsData from './questions.json';

function ExamBTDS({ goToExams }) { // Agregamos la función 'goToExams' como prop
    const [selectedSubject, setSelectedSubject] = useState("");
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
  
    const subjects = Object.keys(questionsData);

    // Define currentQuestions here
    const currentQuestions = selectedSubject ? questionsData[selectedSubject] : [];
  
    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setUserAnswers({});
        setShowResults(false);
    };
  
    const handleAnswerSelect = (questionIndex, optionIndex) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: optionIndex
        }));
    };
  
    const calculateResults = () => {
        setShowResults(true);
        saveResults(); // Guardar los resultados después de calcularlos
    };

    const correctAnswersCount = currentQuestions.reduce((count, question, index) => {
        return count + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
  
    const saveResults = () => {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
      
        const dataToSend = {
            ID_usuario: userId,
            Tipo_usuario: role,
            Materia: selectedSubject,
            Semestre: "Primer Semestre", // Cambiar dinámicamente si es necesario
            Correctas: correctAnswersCount,
            Incorrectas: currentQuestions.length - correctAnswersCount,
        };
      
        console.log("Enviando datos al backend:", dataToSend);
      
        fetch(`${import.meta.env.VITE_API_URL}/api/saveExamResults`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log("Resultados guardados exitosamente:", data);
                } else {
                    console.error("Error al guardar resultados:", data.error);
                }
            })
            .catch((error) => {
                console.error("Error al conectar con el servidor:", error);
            });
    };

    return (
        <div className={styles["app-container"]}>
            <h1 className={styles["title"]}>Cuestionario Académico</h1>
            
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
                    <h2 className={styles["subject-title"]}>{selectedSubject}</h2>
                    
                    {currentQuestions.map((question, qIndex) => (
                        <div key={qIndex} className={styles["question-card"]}>
                            <h3 className={styles["question-text"]}>
                                {qIndex + 1}. {question.question}
                            </h3>
                            
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
                            <p>
                                Correctas: <span className={styles["correct-count"]}>{correctAnswersCount}</span> / 
                                Total: <span>{currentQuestions.length}</span>
                            </p>
                            <p className={styles["percentage"]}>
                                ({Math.round((correctAnswersCount/currentQuestions.length) * 100)}%)
                            </p>
                            <button 
                                className={styles["retry-button"]}
                                onClick={() => handleSubjectChange({ target: { value: selectedSubject } })}
                            >
                                Intentar nuevamente
                            </button>
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

export default ExamBTDS;