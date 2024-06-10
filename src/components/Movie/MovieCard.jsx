import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.movieId}`} className="movie-link">
        <img src={movie.image} alt={movie.name} className="movie-image" />
        <div className="movie-details">
          <h3 className="movie-name">{movie.name}</h3>
          <p className="movie-views">Lượt xem: {movie.views}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
