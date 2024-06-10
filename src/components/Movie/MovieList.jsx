import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../Utils/api';
import './MovieList.css';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [token, setToken] = useState(null); // Thêm biến setToken vào useState

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await request('GET', '/api/movie/get-all');
                // Trích xuất token từ object phản hồi
                const receivedToken = response.token;
                // Lưu token vào state
                setToken(receivedToken);
                // Tiếp tục lấy danh sách phim hoặc thực hiện các thao tác khác nếu cần
                const data = await request('GET', '/api/movie/get-all', null, { Authorization: `Bearer ${receivedToken}` });
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                // Xử lý lỗi khi không thể lấy danh sách phim
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Danh sách phim</h1>
            <div className="movie-container">
                {movies.map(movie => (
                 <Link to={`/movie/${movie.movieId}`}>
                    <div className="movie-card" key={movie.id}>
                        <h2>{movie.name}</h2>
                        <img className="movie-image" src={movie.image} alt={movie.name} />
                        <p>Nội dung: {movie.movie_content}</p>
                        <p>Số tập: {movie.episodes}</p>
                        <p>Lịch chiếu: {movie.movie_schedule}</p>
                        <p>Quốc gia: {movie.country.name}</p>
                        <p>Đánh giá: {movie.star}</p>
                        <p>Giá vé: {movie.price}</p>
                        <p>Lượt xem: {movie.views}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
