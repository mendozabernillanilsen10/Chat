import './UserProfile.css';

import React, { useRef } from 'react';

import { Icon } from 'semantic-ui-react';

const UserProfile = ({ user, onLogout }) => {
  const imageUrl = user.Foto ? `${import.meta.env.VITE_API_URL}/imagenes/${user.Foto}` : "imagenes/default.jpg";
  const logoutButtonRef = useRef(null);

  return (
    <div className="profile-sign-container">
      <div className="profile-frame">
        <div className="profile-header">
          <h1 className="profile-title">PERFIL</h1>
          <p className="profile-subtitle">{user.role === "tutor" ? "TUTOR" : "ALUMNO"}</p>
        </div>
        
        <div className="profile-body">
          <img
            id="fotoPerfil"
            src={imageUrl}
            alt="Foto de perfil"
            className="profile-img"
          />
          
          <div className="profile-info">
            <p>
              <strong>NOMBRE:</strong> <span id="nombre">{user.Tutor || user.Nombre || "N/A"}</span>
            </p>
            {user.role === "alumno" && (
              <>
                <p>
                  <strong>GRADO:</strong> <span id="grado">{user.Grado || "N/A"}</span>
                </p>
                <p>
                  <strong>CARRERA:</strong> <span id="carrera">{user.Carrera || "N/A"}</span>
                </p>
              </>
            )}
            {user.role === "tutor" && (
              <p>
                <strong>DESCRIPCIÓN:</strong> <span id="descripcion">{user.Descripcion || "N/A"}</span>
              </p>
            )}
            <p>
              <strong>EMAIL:</strong> <span id="gmail">{user.Gmail || "N/A"}</span>
            </p>
            <p>
              <strong>TELÉFONO:</strong> <span id="telefono">{user.Numero || "N/A"}</span>
            </p>
          </div>

          <button 
            ref={logoutButtonRef} 
            className="profile-button" 
            onClick={onLogout}
          >
            CERRAR SESIÓN <Icon name="sign out" />
          </button>
        </div>

        <div className="profile-footer">
          <p>BIENVENIDO A TUTOCHAT</p>
        </div>

        <div className="profile-stamp">Usuario</div>
        <div className="profile-tag">{(user.role || "N/A").toUpperCase()}</div>
      </div>
    </div>
  );
};

export default UserProfile;