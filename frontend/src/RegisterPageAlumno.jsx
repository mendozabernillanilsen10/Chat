import './RegisterPageAlumno.css';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const RegisterPageAlumno = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    grado: "",
    carrera: "",
    email: "",
    telefono: "",
    contrasena: "",
    foto: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.grado ||
      !formData.carrera ||
      !formData.email ||
      !formData.telefono ||
      !formData.contrasena ||
      !formData.foto
    ) {
      setError("Faltan campos requeridos");
      return;
    }

    const form = new FormData();
    form.append("nombre", formData.nombre);
    form.append("grado", formData.grado);
    form.append("carrera", formData.carrera);
    form.append("gmail", formData.email);
    form.append("numero", formData.telefono);
    form.append("contrasena", formData.contrasena);
    form.append("fotoPerfil", formData.foto);

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/registerAlumno`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-container">
      <div className="sign-frame">
        <div className="sign-header">
          <h1 className="sign-title">REGISTRO</h1>
          <p className="sign-subtitle">ALUMNO NUEVO</p>
        </div>

        <div className="sign-body">
          {error && (
            <div className="error-notice">
              <i className="exclamation circle icon"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="order-form-field">
              <label>NOMBRE DEL ALUMNO</label>
              <div className="input-area">
                <Icon name="user" className="form-icon" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="order-form-field">
              <label>GRADO</label>
              <div className="input-area">
                <Icon name="graduation cap" className="form-icon" />
                <input
                  type="text"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  placeholder="Grado académico"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="order-form-field">
              <label>CARRERA</label>
              <div className="input-area">
                <Icon name="book" className="form-icon" />
                <input
                  type="text"
                  name="carrera"
                  value={formData.carrera}
                  onChange={handleChange}
                  placeholder="Carrera profesional"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="order-form-field">
              <label>CORREO ELECTRÓNICO</label>
              <div className="input-area">
                <Icon name="mail" className="form-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="order-form-field">
              <label>NÚMERO DE TELÉFONO</label>
              <div className="input-area">
                <Icon name="phone" className="form-icon" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+51 123 456 789"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="order-form-field">
              <label>CONTRASEÑA</label>
              <div className="input-area">
                <Icon name="lock" className="form-icon" />
                <input
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="file-input-container">
              <label>FOTO DE PERFIL</label>
              <div className="file-input-wrapper">
                <label className="file-input-content">
                  <Icon name="camera" className="file-input-icon" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                  <span className="file-input-text">
                    {formData.foto
                      ? formData.foto.name
                      : "Haz clic para seleccionar archivo"}
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              REGISTRAR <span className="button-arrow">→</span>
            </button>
          </form>
        </div>

        <div className="sign-footer">
          <p className="promo-sticker">
            ¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a>
          </p>
        </div>

        <div className="shop-stamp">v2.5</div>
        <div className="price-tag">GRATIS</div>
        <div className="corner-decoration"></div>
      </div>
    </div>
  );
};

export default RegisterPageAlumno;