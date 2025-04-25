import './Chat.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  Label,
  Modal,
} from 'semantic-ui-react';

const Chat = ({ messages, sendMessage, user, socket, roomId }) => {
  const [message, setMessage] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  // Función para construir la URL correcta del avatar
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return '/default-avatar.png';
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${import.meta.env.VITE_API_URL}/imagenes/${avatarPath}`;
  };

  // Componente Avatar optimizado
  const UserAvatar = ({ avatar, onClick, isUser = false }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div className={`avatar-container ${isUser ? 'current-user' : ''}`}>
        <Image 
          avatar
          src={imgError ? '/default-avatar.png' : getAvatarUrl(avatar)}
          onError={() => {
            console.error("Error cargando avatar:", avatar);
            setImgError(true);
          }}
          onClick={onClick}
          className="hover-effect"
          style={{ 
            width: '36px',
            height: '36px',
            minWidth: '36px',
            cursor: onClick ? 'pointer' : 'default'
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (!socket) return;

    const handleTyping = (data) => {
      if (data.roomId === roomId && data.userId !== user?.id) {
        setTypingUser(data.username);
        setIsTyping(true);
        
        const timer = setTimeout(() => {
          setIsTyping(false);
          setTypingUser("");
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    };

    socket.on("user_typing", handleTyping);

    return () => {
      socket.off("user_typing", handleTyping);
    };
  }, [socket, roomId, user]);

  const getUniqueMessages = (messages) => {
    const unique = [];
    const seen = new Set();
    
    messages.forEach(msg => {
      const senderId = msg.sender_id || msg.senderId;
      const key = `${senderId}-${msg.message}-${new Date(msg.timestamp || msg.created_at).getTime()}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(msg);
      }
    });
    
    return unique.sort((a, b) => 
      new Date(a.timestamp || a.created_at) - new Date(b.timestamp || b.created_at)
    );
  };

  const handleProfileClick = async (userId, role) => {
    if (!userId || role !== "tutor") return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/${userId}/${role}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setSelectedProfile(data);
      setProfileModalOpen(true);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleCloseModal = () => {
    setProfileModalOpen(false);
    setSelectedProfile(null);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    if (socket && user) {
      socket.emit("typing", {
        roomId,
        userId: user.id,
        username: user.username
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message.trim());
    setMessage("");
    setIsTyping(false);
  };

  const isCurrentUser = (senderId) => {
    return user && (senderId === user.id || senderId === user._id);
  };

  const uniqueMessages = getUniqueMessages(messages);

  return (
    <div className="chat-container">
      <Header as="h2" className="chat-header">
        <Icon name="comments" />
        Sala de Chat
        {roomId && <Label circular color="red" size="mini">{roomId}</Label>}
      </Header>
      
      <div className="messages-container">
        {uniqueMessages.length > 0 ? (
          <div className="message-group">
            {uniqueMessages.map((msg, index) => {
              const senderId = msg.sender_id || msg.senderId;
              const isUser = isCurrentUser(senderId);
              
              return (
                <div 
                  key={index} 
                  className={`message-row ${isUser ? 'current-user' : 'other-user'}`}
                >
                  {!isUser && (
                    <UserAvatar 
                      avatar={msg.avatar}
                      onClick={() => handleProfileClick(senderId, msg.role)}
                    />
                  )}
                  
                  <div className="message-content">
                    <div className={`message-meta ${isUser ? 'right' : 'left'}`}>
                      <span 
                        className="message-author" 
                        onClick={msg.role === "tutor" ? () => handleProfileClick(senderId, msg.role) : null}
                      >
                        {msg.username}
                        {msg.role === "tutor" && (
                          <Label circular size="mini" color="red">Tutor</Label>
                        )}
                      </span>
                      <span className="message-time">
                        {new Date(msg.timestamp || msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <div className={`message-bubble ${isUser ? 'current' : 'other'}`}>
                      {msg.message}
                    </div>
                  </div>
                  
                  {isUser && <UserAvatar avatar={user.avatar} isUser={true} />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-messages">
            <Icon name="comment outline" size="huge" />
            <p>No hay mensajes aún. ¡Sé el primero en enviar uno!</p>
          </div>
        )}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <span>{typingUser} está escribiendo...</span>
          </div>
        )}
      </div>

      <Form onSubmit={handleSubmit} className="message-form">
        <Form.TextArea
          value={message}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje aquí..."
          rows={2}
          className="message-input"
        />
        <Button 
          content="Enviar" 
          icon="send" 
          primary 
          className="send-button"
          disabled={!message.trim()}
        />
      </Form>

      <Modal 
        open={profileModalOpen} 
        onClose={handleCloseModal} 
        size="small"
        className="profile-modal"
      >
        <Modal.Header>
          <Icon name="user circle" />
          Perfil del Tutor
        </Modal.Header>
        <Modal.Content image>
          <UserAvatar 
            avatar={selectedProfile?.Foto} 
            style={{ width: '80px', height: '80px' }}
          />
          <Modal.Description>
            <Header>{selectedProfile?.Tutor || "Nombre no disponible"}</Header>
            <div className="profile-details">
              <p><Icon name="info circle" /> {selectedProfile?.Descripcion || "Descripción no disponible"}</p>
              <p><Icon name="mail" /> {selectedProfile?.Gmail || "Email no disponible"}</p>
              <p><Icon name="phone" /> {selectedProfile?.Numero || "Teléfono no disponible"}</p>
              {selectedProfile?.Rating && (
                <div className="rating-section">
                  <Icon name="star" color="yellow" />
                  <span>{selectedProfile.Rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCloseModal} primary>
            <Icon name="close" /> Cerrar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Chat;