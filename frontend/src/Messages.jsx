import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import "./Messages.css"; // Crearemos este archivo CSS

const Messages = ({ userId, role, onSelectRoom, rooms }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rooms.length > 0) {
      setLoading(false);
    }
  }, [rooms]);

  const filteredRooms = role === "tutor" ? rooms.filter((room) => room.is_private) : rooms;

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2 className="messages-title">
          <Icon name="mail" />
          SALAS DE CHAT
        </h2>
        <div className="messages-count">
          {filteredRooms.length}
        </div>
      </div>

      <div className="rooms-list">
        {loading ? (
          <div className="loading-message">
            <Icon name="spinner" loading />
            CARGANDO SALAS...
          </div>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div 
              key={room.id} 
              className="room-item"
              onClick={() => onSelectRoom(room.id)}
            >
              <div className="room-image-container">
                <img
                  src={room.image_url || "https://placehold.co/150x150"}
                  className="room-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/150x150";
                  }}
                  alt={room.name}
                />
              </div>
              <div className="room-info">
                <h3 className="room-name">{room.name.toUpperCase()}</h3>
                {room.is_private && (
                  <div className="private-tag">
                    <Icon name="lock" /> PRIVADA
                  </div>
                )}
              </div>
              <div className="room-arrow">
                <Icon name="arrow right" />
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">
            <Icon name="info circle" />
            NO TIENES SALAS DISPONIBLES
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;