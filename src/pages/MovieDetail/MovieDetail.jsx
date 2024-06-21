import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail, saveMovieToCollection, getCommentsByMovie, createComment } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './MovieDetail.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';


const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveMessage, setSaveMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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

        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByMovie(movieId);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchMovieDetail();
        fetchComments();
    }, [movieId]);

    const handleSaveMovie = async () => {
        try {
            const username = JSON.parse(localStorage.getItem('userInfo')).username; // Lấy username từ localStorage
            const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại
            const movieCollection = { movieId: parseInt(movieId), username, time: today };

            const response = await saveMovieToCollection(movieCollection);
            // setSaveMessage(response.desc);
            setSaveMessage('Đã lưu phim');
        } catch (error) {
            setSaveMessage('Error saving movie to collection');
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await createComment({ movieId, content: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const renderStars = (value) => {
      return (
        <>
          {[...Array(value)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="star-filled" />
          ))}
          {[...Array(5 - value)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="star-empty" />
          ))}
        </>
      );
    };

    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    };

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
            <Header />

            <div className="movie-detail">
                <h2 className="title">{movie.name}</h2>
                <div className="details">
                    <img src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="poster" />
                    <div className="info">
                        <p className="episodes">Số tập: {movie.episodes}</p>
                        <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
                        <p className="country">Quốc gia: {movie.country.name}</p>
                        <p className="star">
                            {movie.star === 0 ? (
                                <span>Chưa có đánh giá</span>
                            ) : (
                                <>
                                Đánh giá: {movie.star}/5 <FontAwesomeIcon icon={faStar} />
                                </>
                            )}
                            </p>
 
                        <p className="price">Giá mua: {movie.price}</p>
                        {/* <p className="views">Lượt xem: {movie.views}</p> */}

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
                            
                            
                            {/* <div className="list-item-episode scroll-bar">
                              {movie.categories.some(category => category.name === "Phim lẻ") ? (
                                  movie.episodeList.map(episode => (
                                    <Link to={`/watch/${movieId}/${episode.episodeId}`} key={episode.episodeId}>
                                        <span>Full</span>
                                    </Link>
                                ))
                              ) : (
                                  movie.episodeList.map(episode => (
                                      <Link to={`/watch/${movieId}/${episode.episodeId}`} key={episode.episodeId}>
                                          <span>{episode.episode}</span>
                                      </Link>
                                  ))
                              )}
                          </div> */}

                          

                            {movie.episodes === 1 ? (
                                <div className="list-item-episode scroll-bar">
                                    <Link to={`/watch/${movieId}/${movie.episodeList[0].episodeId}`}>
                                        <span>Full</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="list-item-episode scroll-bar">
                                    {movie.episodeList.map(episode => (
                                        <Link to={`/watch/${movieId}/${episode.episodeId}`} key={episode.episodeId}>
                                            <span>{episode.episode}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        </div>

                        
                        <div>
                            <span onClick={handleSaveMovie} className="save-movie-button">
                                <FontAwesomeIcon icon={faBookmark} />
                            </span>
                            {saveMessage && <p className="save-message">{saveMessage}</p>}
                        </div>
                    </div>
                </div>
                <p className="content">Mô tả: {movie.movieContent}</p>

                <div>
                    <p>Diễn viên:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {movie.persons.map(person => (
                            <div key={person.personId} style={{ margin: '10px', textAlign: 'center' }}>
                                <img src={`${process.env.REACT_APP_UPLOAD_URL}/${person.image}`} alt={person.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                                <span style={{ display: 'block', marginTop: '5px' }}>{person.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='list-comment'>
                <h2 className='text' style={{ textAlign: 'center' }}>Bình luận</h2>
                <div className="comment-section">
                    <div className="new-comment">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập bình luận của bạn..."
                        />
                        <br />
                        <button onClick={handleCommentSubmit}>Gửi</button>
                    </div>
                    {comments.length > 0 ? (
                        <ul className="comment-list">
                            {comments.map(comment => (
                                <li key={comment.id} className="comment-item">
                                    <div className="comment-header">
                                        <img src={`${process.env.REACT_APP_UPLOAD_URL}/${comment.avatar}`}  alt={comment.name} className="comment-avatar" />
                                        <span className="comment-name">{comment.name}</span>
                                        <span className="comment-date">{formatDate(comment.date)}</span>
                                        <div className="comment-rating">{renderStars(comment.value)}</div>
                                    </div>
                                    <div className="comment-content">{comment.comment}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-comment">Không có bình luận</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MovieDetail;
