import './CreateChatRoomForm.css';

import React, { Component } from 'react';

import { Icon } from 'semantic-ui-react';

class CreateChatRoomForm extends Component {
  state = {
    name: '',
    description: '',
    isPrivate: false,
    password: '',
    fotoSala: null,
    error: '',
    success: '',
    fileName: 'Seleccionar archivo'
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ 
      fotoSala: file,
      fileName: file ? file.name : 'Seleccionar archivo'
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, isPrivate, password, fotoSala } = this.state;

    if (!name || !fotoSala) {
      this.setState({ 
        error: 'EL NOMBRE DE LA SALA Y LA FOTO SON OBLIGATORIOS', 
        success: '' 
      });
      return;
    }

    if (isPrivate && !password) {
      this.setState({ 
        error: 'LAS SALAS PRIVADAS REQUIEREN CONTRASEÑA', 
        success: '' 
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('isPrivate', isPrivate);
    formData.append('password', password);
    formData.append('fotoSala', fotoSala);
    formData.append('userId', this.props.userId);
    formData.append('role', this.props.role);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/createRoom`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.error) {
        this.setState({ 
          error: data.error.toUpperCase(), 
          success: '' 
        });
      } else {
        this.setState({ 
          success: '¡SALA CREADA EXITOSAMENTE!', 
          error: '',
          name: '',
          description: '',
          isPrivate: false,
          password: '',
          fotoSala: null,
          fileName: 'Seleccionar archivo'
        });
        if (this.props.onRoomCreated) {
          this.props.onRoomCreated(data.room);
        }
      }
    } catch (err) {
      console.error('Error al crear la sala:', err);
      this.setState({ 
        error: 'ERROR AL CREAR LA SALA', 
        success: '' 
      });
    }
  };

  render() {
    const { name, description, isPrivate, password, error, success, fileName } = this.state;

    return (
      <div className="create-room-container">
        <div className="create-room-header">
          <h2>
            <Icon name="add circle" />
            CREAR NUEVA SALA
          </h2>
        </div>

        {(error || success) && (
          <div className={`create-room-message ${error ? 'error' : 'success'}`}>
            <Icon name={error ? 'warning circle' : 'check circle'} />
            {error || success}
          </div>
        )}

        <form onSubmit={this.handleSubmit} className="create-room-form">
          <div className="form-field">
            <label>NOMBRE DE LA SALA</label>
            <div className="input-area">
              <Icon name="hashtag" className="form-icon" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="EJ: MATEMÁTICAS AVANZADAS"
              />
              <div className="input-decoration"></div>
            </div>
          </div>

          <div className="form-field">
            <label>DESCRIPCIÓN</label>
            <div className="input-area">
              <Icon name="info circle" className="form-icon" />
              <input
                type="text"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="EJ: CLASES DE CÁLCULO DIFERENCIAL"
              />
              <div className="input-decoration"></div>
            </div>
          </div>

          <div className="form-field checkbox-field">
            <label>
              <input
                type="checkbox"
                name="isPrivate"
                checked={isPrivate}
                onChange={(e) => this.setState({ isPrivate: e.target.checked })}
              />
              <span className="checkbox-custom"></span>
              SALA PRIVADA
            </label>
          </div>

          {isPrivate && (
            <div className="form-field">
              <label>CONTRASEÑA</label>
              <div className="input-area">
                <Icon name="lock" className="form-icon" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="INGRESA UNA CONTRASEÑA"
                />
                <div className="input-decoration"></div>
              </div>
            </div>
          )}

          <div className="form-field">
            <label>FOTO DE LA SALA</label>
            <div className="file-input-wrapper">
              <label className="file-input-content">
                <Icon name="camera" className="file-input-icon"/>
                <input 
                  type="file" 
                  onChange={this.handleFileChange}
                  accept="image/*"
                />
                <span className="file-input-text">{fileName}</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            CREAR SALA <Icon name="arrow right" />
          </button>
        </form>
      </div>
    );
  }
}

export default CreateChatRoomForm;