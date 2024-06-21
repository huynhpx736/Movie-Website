import React, { useState,useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

const MovieCardBought = ({ movie }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Card className="movie-card">
        <Link to={`/movie/${movie.movieId}`} className="movie-link">
          <div className="movie-info">
            {/* <div className="movie-rating">
              {movie.star}/5 <FontAwesomeIcon icon={faStar} />
            </div> */}
            {/* <div className="movie-views">
              {movie.categories.some(category => category.name === "Phim lẻ") ? (
                <div className="movie-category">Full</div>
              ) : null}
            </div> */}
            {/* nếu phim có tổng số tập bằng 1 thì hiện chữ full */}
            {movie.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>
        
          {/* <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.imageMovie}`} alt={movie.imageMovie} className="movie-image" /> */}
          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.imageMovie || 'temp.jpg'}`} alt={movie.movieName} className="movie-image" />

          <Card.Body>
            <Card.Title className="movie-name">{movie.name||movie.movieName}</Card.Title>
          </Card.Body>
        </Link>
      </Card>

    </div>
  );
};

export default MovieCardBought;
