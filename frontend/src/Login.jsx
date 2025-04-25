import './Login.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Form,
  Icon,
} from 'semantic-ui-react';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        try {
          console.log("Enviando datos al backend:", { usuario, contrasena });
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, contrasena }),
          });

          console.log("Respuesta del servidor:", response);
          const data = await response.json();
          console.log("Datos recibidos del servidor:", data);

          if (data.success) {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            localStorage.setItem("foto", data.foto);
            localStorage.setItem("rooms", JSON.stringify(data.rooms));
            
            setTimeout(() => {
              navigate("/tutores");
            }, 500);
          } else {
            setError("Usuario o contraseña incorrectos");
          }
        } catch (err) {
          console.error("Error en login:", err);
          setError("Error de conexión con el servidor");
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="shop-sign-container">
            {/* Marco estilo letrero */}
            <div className="sign-frame">
                <div className="sign-header">
                    <div className="sign-title">ACCESO</div>
                    <div className="sign-subtitle">SISTEMA DE INGRESO</div>
                </div>
                
                <div className="sign-body">
                    <Form onSubmit={handleSubmit}>
                        <div className="order-form-field">
                            <label>USUARIO</label>
                            <div className="input-area">
                                <Icon name="user outline" className="form-icon"/>
                                <input
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                                <div className="input-decoration"></div>
                            </div>
                        </div>
                        
                        <div className="order-form-field">
                            <label>CONTRASEÑA</label>
                            <div className="input-area">
                                <Icon name="key" className="form-icon"/>
                                <input
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    required
                                />
                                <div className="input-decoration"></div>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="error-notice">
                                <Icon name="warning circle"/>
                                {error}
                            </div>
                        )}
                        
                        <button type="submit" className="submit-button">
                            ENTRAR <span className="button-arrow">››</span>
                        </button>
                    </Form>
                </div>
                
                <div className="sign-footer">
                    <div className="promo-sticker">
                        <Icon name="star outline"/>
                        <span>¿PRIMERA VEZ? REGÍSTRATE GRATIS</span>
                        <Icon name="star outline"/>
                    </div>
                </div>
            </div>
            
            {/* Detalles decorativos */}
            <div className="shop-stamp">INGRESA A LA PAGINA</div>
            <div className="price-tag">v2.5</div>
            <div className="corner-decoration"></div>
        </div>
    );
};

export default Login;