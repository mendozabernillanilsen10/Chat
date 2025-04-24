import React from "react";
import ProgressGraph from "./ProgressGraph";
import "./Exams.css"; // Archivo CSS personalizado

const Exams = ({ openExam }) => {
  return (
    <div className="exams-container">
      <div className="exams-header">
        <h2>CALIFICAR EXÁMENES</h2>
      </div>
      <div className="exams-body">
        <button className="exams-button" onClick={() => openExam("examBG")}>
          EXÁMENES BG
        </button>
        <button className="exams-button" onClick={() => openExam("examBTDS")}>
          EXÁMENES BTDS
        </button>
        <button className="exams-button" onClick={() => openExam("examBTDI")}>
          EXÁMENES BTDI
        </button>
        <div className="progress-section">
          <h3>PROGRESO EN LOS EXÁMENES</h3>
          <ProgressGraph />
        </div>
      </div>
    </div>
  );
};

export default Exams;