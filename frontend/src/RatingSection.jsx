import './RatingSection.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { Icon } from 'semantic-ui-react';

const RatingSection = ({ rooms, user }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ratings`);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${res.status} al obtener calificaciones`);
        }
        
        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.error("Error fetching ratings:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validaciones del frontend
    if (!selectedRoom) {
      setError("Por favor selecciona una sala");
      setIsSubmitting(false);
      return;
    }

    if (rating === 0) {
      setError("Por favor califica con estrellas");
      setIsSubmitting(false);
      return;
    }

    if (comment.trim() === "") {
      setError("Por favor escribe un comentario");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Enviando calificación:", {
        roomId: selectedRoom.id,
        userId: user.id,
        username: user.username || user.Tutor || user.Nombre,
        rating,
        comment,
        role: user.role
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ratings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          userId: user.id,
          username: user.username || user.Tutor || user.Nombre,
          rating,
          comment,
          role: user.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar calificación");
      }

      setRatings([data.rating, ...ratings]);
      setRating(0);
      setHover(0);
      setComment("");
      
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError(err.message || "Error al enviar calificación. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating-container">
      <h2 className="rating-title">CALIFICAR SALAS</h2>
      
      <form onSubmit={handleSubmit}>
        <select 
          className="room-selector"
          value={selectedRoom?.id || ""}
          onChange={(e) => {
            const room = rooms.find(r => r.id === parseInt(e.target.value));
            setSelectedRoom(room);
          }}
          disabled={isSubmitting}
        >
          <option value="">SELECCIONA UNA SALA</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name.toUpperCase()}
            </option>
          ))}
        </select>

        <div className="custom-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon 
              key={star}
              name="star" 
              size="large"
              style={{ 
                color: star <= (hover || rating) ? "var(--yellow)" : "var(--border)",
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
              onMouseEnter={() => !isSubmitting && setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => !isSubmitting && setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="comment-area"
          placeholder="ESCRIBE TU COMENTARIO..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
        />

        {error && (
          <div className="rating-error">
            <Icon name="warning circle" style={{ marginRight: "10px" }} />
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-rating"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon name="spinner" loading />
              ENVIANDO...
            </>
          ) : (
            "ENVIAR CALIFICACIÓN"
          )}
        </button>
      </form>

      <h3 className="rating-title" style={{ marginTop: "3rem" }}>
        CALIFICACIONES RECIENTES
      </h3>
      
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Icon name="spinner" loading size="big" />
          <p>Cargando calificaciones...</p>
        </div>
      ) : ratings.length === 0 ? (
        <p style={{ 
          fontFamily: "'Dela Gothic One', sans-serif",
          color: "var(--ink)",
          textAlign: "center",
          padding: "1rem"
        }}>
          No hay calificaciones aún. ¡Sé el primero!
        </p>
      ) : (
        <div className="ratings-grid">
          {ratings.map((ratingItem) => (
            <div key={ratingItem.id} className="rating-card">
              <h4 className="rating-card-header">
                {rooms.find(r => r.id === ratingItem.room_id)?.name.toUpperCase() || 'Sala desconocida'}
              </h4>
              <div className="rating-card-meta">
                <div className="rating-card-stars">
                  {[...Array(ratingItem.rating)].map((_, i) => (
                    <Icon key={i} name="star" color="yellow" />
                  ))}
                </div>
                <span>por {ratingItem.username}</span>
              </div>
              <p className="rating-card-comment">{ratingItem.comment}</p>
              {ratingItem.user_photo && (
                <img 
                  src={ratingItem.user_photo} 
                  alt="User" 
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginTop: '10px'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingSection;