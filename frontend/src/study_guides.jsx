import './study_guides.css';

import React from 'react';


const StudyGuides = () => {
  const guides = [
    { name: 'Guía de Matemáticas', file: `${import.meta.env.VITE_API_URL}/guias/guia matematicas.pdf` },
    { name: 'Guía de Historia', file: `${import.meta.env.VITE_API_URL}/guias/guia historia.pdf` },
    { name: 'Guía de Ciencias', file: `${import.meta.env.VITE_API_URL}/guias/Guia quimica.pdf` },
    { name: 'Guía de Español', file: `${import.meta.env.VITE_API_URL}/guias/Guia de trabajo.pdf` },
    { name: 'Guía de Inglés', file: `${import.meta.env.VITE_API_URL}/guias/Guia Ingles.pdf` },
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