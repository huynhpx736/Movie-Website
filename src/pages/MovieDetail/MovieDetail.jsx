import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail } from '../../Utils/api';
import './MovieDetail.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieDetail = await getMovieDetail(movieId);
        setMovie(movieDetail);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie detail');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="no-movie">No movie found</div>;
  }

  return (
    <div className='mainBody'>
      <Header/>

      <div className="movie-detail">
        <h2 className="title">{movie.name}</h2>
        <div className="details">
          <img src={movie.image} alt={movie.name} className="poster" />
          <div className="info">
            <p className="episodes">Số tập: {movie.episodes}</p>
            <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
            <p className="country">Quốc gia: {movie.country.name}</p>
            <p className="star">Đánh giá: {movie.star}/5</p>
            <p className="price">Giá mua: {movie.price}</p>
            <p className="views">Lượt xem: {movie.views}</p>

            <div className="list_cate">
              <p>Thể loại</p>
              <div>
                {movie.categories.map(category => (
                  <Link to={`/the-loai/${category.categoryId}`} key={category.categoryId}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="list_episode ah-frame-bg">
              <div className="heading flex flex-space-auto fw-700">
                <p>Danh sách tập</p>
                <span id="newest-ep-is-readed" className="fs-13"></span>
              </div>
              <div className="list-item-episode scroll-bar">
                {movie.episodeList.map(episode => (
                  <Link to={`/watch/${movieId}/${episode.episodeId}`} key={episode.episodeId}>
                    <span>{episode.episode}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link to={`/watch/${movieId}`} className="watch-now-button">Xem ngay</Link>
          </div>
        </div>
        <p className="content">Mô tả: {movie.movieContent}</p>

        <div>
          Diễn viên:
          <div>
            {movie.persons.map(person => (
              <Link to={`/dien-vien/${person.personId}`} key={person.personId}>
                {person.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='list-comment'>
        <h2>Bình luận</h2>
      </div>

      <Footer/>
    </div>
  );
};

export default MovieDetail;
