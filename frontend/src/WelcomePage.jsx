import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Modal, Button } from "semantic-ui-react";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleRegister = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-frame">
        <div className="welcome-header">
          <h1 className="welcome-title">BIENVENIDO</h1>
          <p className="welcome-subtitle">TUTOCHAT</p>
        </div>

        <div className="welcome-body">
          <p className="welcome-message">Elige una opción para continuar:</p>
  
          <div className="button-group">
            <button
              className="welcome-button login-btn"
              onClick={() => navigate("/login")}
            >
              INICIAR SESIÓN <Icon name="sign in" />
            </button>
            <button
              className="welcome-button register-btn"
              onClick={handleRegister}
            >
              REGISTRARSE <Icon name="user plus" />
            </button>
          </div>
        </div>

        <div className="welcome-footer">
          <p>v2.5 - 2024</p>
        </div>

        <div className="welcome-stamp">¡NUEVO!</div>
        <div className="welcome-tag">ENTRADA</div>
      </div>

      {/* Modal para elegir entre Tutor o Alumno */}
      <Modal size="tiny" open={openModal} onClose={closeModal}>
        <Modal.Header>¿Cómo deseas registrarte?</Modal.Header>
        <Modal.Content>
          <p>Por favor, selecciona una de las siguientes opciones:</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            onClick={() => {
              navigate("/register-tutor"); 
              closeModal();
            }}
          >
            Como Tutor
          </Button>
          <Button
            color="green"
            onClick={() => {
              navigate("/register-alumno");
              closeModal();
            }}
          >
            Como Alumno
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default WelcomePage;