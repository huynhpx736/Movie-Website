// MovieNew.jsx
import React, { useEffect, useState } from 'react';
import { getNewMovies } from '../../Utils/api';
import MovieCard from '../../components/Movie/MovieCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function MovieNew() {
    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        // Gọi hàm API để lấy danh sách phim mới nhất
        getNewMovies(20) // Lấy 10 phim mới nhất (số lượng có thể điều chỉnh)
            .then(movies => setNewMovies(movies))
            .catch(error => console.error('Error fetching new movies:', error));
    }, []);

    return (
    <div className='mainBody'>
      <Header/>
      
        <div>
            <h2>Phim mới nhất</h2>
            <div className="movie-list">
                {newMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>

        <Footer/>
    </div>
    );
}

export default MovieNew;
