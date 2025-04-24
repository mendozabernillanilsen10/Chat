import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './MenuPage.css';

const MenuPage = ({ activeItem, handleItemClick }) => (
  <div className="menu-container">
    <div className="menu-bar">
      <div className="menu-items">
        <Link 
          to="/" 
          className={`menu-item ${activeItem === 'home' ? 'active' : ''}`}
          onClick={() => handleItemClick('home')}
        >
          <Icon name="home" />
          INICIO
        </Link>
        
        <Link 
          to="/messages" 
          className={`menu-item ${activeItem === 'messages' ? 'active' : ''}`}
          onClick={() => handleItemClick('messages')}
        >
          <Icon name="mail" />
          MENSAJES
        </Link>
        
        <Link 
          to="/rooms" 
          className={`menu-item ${activeItem === 'rooms' ? 'active' : ''}`}
          onClick={() => handleItemClick('rooms')}
        >
          <Icon name="comments" />
          SALAS
        </Link>
        
        <Link 
          to="/rating" 
          className={`menu-item ${activeItem === 'rating' ? 'active' : ''}`}
          onClick={() => handleItemClick('rating')}
        >
          <Icon name="star" />
          CALIFICACIONES
        </Link>
      </div>
      
      <div className="menu-right">
        <Link 
          to="/login" 
          className={`menu-item ${activeItem === 'login' ? 'active' : ''}`}
          onClick={() => handleItemClick('login')}
        >
          <Icon name="sign in" />
          INGRESAR
        </Link>
      </div>
    </div>
  </div>
);

export default MenuPage;