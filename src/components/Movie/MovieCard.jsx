// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
// import './MovieCard.css';

// const MovieCard = ({ movie }) => {
//   return (
//     <Card className="movie-card">
//       <Link to={`/movie/${movie.movieId}`} className="movie-link">
//         <div className="movie-info">
//           <div className="movie-rating">
//             {movie.star}/5 <FontAwesomeIcon icon={faStar} />
//           </div>
//           <div className="movie-views">
//             {/* <FontAwesomeIcon icon={faEye} /> {movie.views} */}
//             {movie.categories.some(category => category.name === "Phim lẻ") ? (
//             <div className="movie-category">Full</div>
//           ) : null}
//           </div>
          
//         </div>
//         <Card.Img variant="top" src={movie.image} alt={movie.name} className="movie-image" />
//         {/* <Card.Img variant="top"  src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="movie-image" /> */}
//         <Card.Body>
//           <Card.Title className="movie-name">{movie.name}</Card.Title>
//         </Card.Body>
//       </Link>
//     </Card>
//   );
// };

// export default MovieCard;
















// import React, { useState } from 'react';
// import { Card, Modal, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faEye, faMoneyBill, faCoins } from '@fortawesome/free-solid-svg-icons';
// import './MovieCard.css';

// const MovieCard = ({ movie }) => {
//   const [showPopup, setShowPopup] = useState(false);

//   const handleCardClick = (e) => {
//     if (movie.price > 0) {
//       e.preventDefault();
//       setShowPopup(true);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div>
//       <Card className="movie-card">
//         <Link to={`/movie/${movie.movieId}`} className="movie-link" onClick={handleCardClick}>
//           <div className="movie-info">
//               {movie.price === 0 ? (
//                 <div className="movie-rating">
//                 Free
//                 </div>
//               ) : (
//                 <div className="movie-rating">
//                 {movie.price} <FontAwesomeIcon icon={faCoins} />
//                 </div>
//               )}

            
//             {/* <div className="movie-views">
//               {movie.categories.some(category => category.name === "Phim lẻ") ? (
//                 <div className="movie-category">Full</div>
//               ) : null}
//             </div> */}
//             {/* nếu phim có tổng số tập bằng 1 thì hiện chữ full */}
//             {movie.episodes === 1 ? (
//               <div className="movie-views"><div className="movie-category">Full</div></div>
//             ) : null}
//           </div>
//           <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="movie-image" />
//           <Card.Body>
//             <Card.Title className="movie-name">{movie.name}</Card.Title>
//           </Card.Body>
//         </Link>
//       </Card>

//       <Modal show={showPopup} onHide={handleClosePopup} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Yêu cầu mua phim</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Bộ phim này có giá {movie.price}đ. Bạn cần mua phim để có thể xem.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClosePopup}>
//             Đóng
//           </Button>
//           <a href="http://localhost:8081/login" target="blank">
//             <Button variant="primary" onClick={() => { /* logic mua phim */ }}>
//              Mua phim
//             </Button>
//           </a>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MovieCard;

















// import React, { useState, useEffect } from 'react';
// import { Card, Modal, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';
// import { createMoviePurchase, checkMoviePurchaseExists, getUserInfo } from '../../Utils/api';
// import './MovieCard.css';

// const MovieCard = ({ movie }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isPurchased, setIsPurchased] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const user = await getUserInfo();
//         setUserInfo(user);
//         if (user) {
//           const exists = await checkMoviePurchaseExists(movie.movieId, user.username);
//           setIsPurchased(exists);
//         }
//       } catch (error) {
//         console.error('Error fetching user info or checking movie purchase:', error);
//       }
//     };

//     fetchUserInfo();
//   }, [movie.movieId]);

//   const handleCardClick = (e) => {
//     if (movie.price > 0 && !isPurchased) {
//       e.preventDefault();
//       setShowPopup(true);
//     }
//   };

//   const handlePurchaseMovie = async () => {
//     try {
//       const movieBuyDTO = {
//         movieId: movie.movieId,
//         username: userInfo.username,
//         price: movie.price,
//         // Add other fields as needed
//       };
//       await createMoviePurchase(movieBuyDTO);
//       setIsPurchased(true);
//       setShowPopup(false);
//       // Optionally, redirect or show a success message
//     } catch (error) {
//       console.error('Error purchasing movie:', error);
//       // Optionally, show an error message
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div>
//       <Card className="movie-card">
//         <Link to={`/movie/${movie.movieId}`} className="movie-link" onClick={handleCardClick}>
//           <div className="movie-info">
//             {movie.price === 0 ? (
//               <div className="movie-rating">Free</div>
//             ) : (
//               <div className="movie-rating">
//                 {movie.price} <FontAwesomeIcon icon={faCoins} />
//               </div>
//             )}
//             {movie.episodes === 1 ? (
//               <div className="movie-views"><div className="movie-category">Full</div></div>
//             ) : null}
//           </div>
//           <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image||movie.imageMovie}`} alt={movie.name} className="movie-image" />
//           <Card.Body>
//             <Card.Title className="movie-name">{movie.name||movie.movieName}</Card.Title>
//           </Card.Body>
//         </Link>
//       </Card>

//       <Modal show={showPopup} onHide={handleClosePopup} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Yêu cầu mua phim</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Bộ phim này có giá {movie.price}đ. Bạn cần mua phim để có thể xem.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClosePopup}>
//             Đóng
//           </Button>
//           <Button variant="primary" onClick={handlePurchaseMovie}>
//             Mua phim
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MovieCard;








import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { createVNPayPayment, checkMoviePurchaseExists, getUserInfo } from '../../Utils/api';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // if (userInfo && userInfo.username) {
            //      usernam = userInfo.username;
            // }
            
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
        if (user) {
          const exists = await checkMoviePurchaseExists(movie.movieId, user.username);
          setIsPurchased(exists);
        }
      } catch (error) {
        console.error('Error fetching user info or checking movie purchase:', error);
      }
    };

    fetchUserInfo();
  }, [movie.movieId]);

  const handleCardClick = (e) => {
    if (movie.price > 0 && !isPurchased) {
      e.preventDefault();
      setShowPopup(true);
    }
  };
  const navi = useNavigate();
  const handlePurchaseMovie = async () => {
   
    try {
      const paymentData = {
        // bankcode:9704198526191432198,
        amount: movie.price,
        language: '123',
        movieId: movie.movieId,
        movieName: movie.name,
        username: userInfo.username,
        email: userInfo.email,
        bankCode: 'NCB', 
        
      };
      const response = await createVNPayPayment(paymentData);
      window.location.href = response.data;
      // navi('/payment-result');
    } catch (error) {
      console.error('Error purchasing movie:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Card className="movie-card">
        <Link to={`/movie/${movie.movieId}`} className="movie-link" onClick={handleCardClick}>
          <div className="movie-info">
            {movie.price === 0 ? (
              <div className="movie-rating">Free</div>
            ) : (
              <div className="movie-rating">
                {movie.price} <FontAwesomeIcon icon={faCoins} />
              </div>
            )}
            {movie.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>
          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image || movie.imageMovie}`} alt={movie.name} className="movie-image" />
          <Card.Body>
            <Card.Title className="movie-name">{movie.name || movie.movieName}</Card.Title>
          </Card.Body>
        </Link>
      </Card>

      <Modal show={showPopup} onHide={handleClosePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu mua phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bộ phim này có giá {movie.price}đ. Bạn cần mua phim để có thể xem.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handlePurchaseMovie}>
            Mua phim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieCard;
