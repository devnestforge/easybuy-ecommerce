import React, { useState } from 'react';

const RatingStars = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating); // Estado de la calificación
  
  // Función para manejar el cambio de calificación
  const handleStarClick = (index) => {
    setRating(index);
    onRatingChange(index); // Pasamos la calificación al componente padre
  };

  // Función para renderizar las estrellas
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          style={{ cursor: 'pointer', fontSize: '30px', color: i <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
};

export default RatingStars;
