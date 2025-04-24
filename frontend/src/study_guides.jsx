import React from 'react';
import './study_guides.css';

const StudyGuides = () => {
  const guides = [
    { name: 'Guía de Matemáticas', file: 'http://localhost:4000/guias/guia matematicas.pdf' },
    { name: 'Guía de Historia', file: 'http://localhost:4000/guias/guia historia.pdf' },
    { name: 'Guía de Ciencias', file: 'http://localhost:4000/guias/Guia quimica.pdf' },
    { name: 'Guía de Español', file: 'http://localhost:4000/guias/Guia de trabajo.pdf' },
    { name: 'Guía de Inglés', file: 'http://localhost:4000/guias/Guia Ingles.pdf' },
  ];

  return (
    <div className="guide-frame">
      <div className="guide-header">
        <h1 className="guide-title">GUÍAS DE ESTUDIO</h1>
        <p className="guide-subtitle">Selecciona y descarga tus guías</p>
      </div>
      <div className="guide-body">
        {guides.map((guide, index) => (
          <div className="guide-item" key={index}>
            <span className="guide-name">{guide.name}</span>
            <a className="guide-download" href={guide.file} download>
              Descargar
            </a>
          </div>
        ))}
      </div>
      <div className="guide-footer">¡Buena suerte en tus estudios!</div>
    </div>
  );
};

export default StudyGuides;