// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { getMovieDetail } from '../../Utils/api';
// import WatchEpisode from '../../components/Movie/WatchEpisode';
// import Footer from '../../components/Footer/Footer';
// import Header from '../../components/Header/Header';

// const WatchMovie = () => {
//   const { movieId, episodeId } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         const movieDetail = await getMovieDetail(movieId);
//         setMovie(movieDetail);
//       } catch (error) {
//         console.error('Error fetching movie detail:', error);
//       }
//     };

//     fetchMovieDetail();
//   }, [movieId]);

//   if (!movie) {
//     return <div>Loading...</div>;
//   }

//   const selectedEpisode = movie.episodeList.find(episode => episode.episodeId === parseInt(episodeId));

//   return (
//     <div className='mainBody'>
//       <Header/>

//       <h2>{movie.name}</h2>
//       {selectedEpisode && <WatchEpisode episode={selectedEpisode} />}

//       <h3>Episode List:</h3>
//       {/* <ul>
//         {movie.episodeList.map(episode => (
//           <li key={episode.episodeId}>
//             <Link to={`/watch/${movieId}/${episode.episodeId}`}>{episode.name}</Link>
//           </li>
//         ))}
//       </ul> */}


//       <ul>
//         {movie.episodeList.map(episode => (
//           <li key={episode.episodeId}>
//             <a href={`/watch/${movieId}/${episode.episodeId}`}>{episode.name}</a>
//           </li>
//         ))}
//       </ul>

      

//       <Footer/>
//     </div>
//   );
// };

// export default WatchMovie;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../../Utils/api';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './WatchMovie.css'

const WatchMovie = () => {
  const { movieId, episodeId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieDetail = await getMovieDetail(movieId);
        setMovie(movieDetail);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const selectedEpisode = movie.episodeList.find(episode => episode.episodeId === parseInt(episodeId));

  return (
    <div className='mainBody'>
      <Header/>
<div className='mainBody'>
      <h2>{movie.name}</h2>

      {selectedEpisode && (
        <div>
          <h3>{selectedEpisode.name}</h3>
          <video controls width="80%" height="auto">
            <source src={selectedEpisode.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <h3>Episode List:</h3>
      <ul>
        {movie.episodeList.map(episode => (
          <li key={episode.episodeId}>
            <a href={`/watch/${movieId}/${episode.episodeId}`}>{episode.name}</a>
          </li>
        ))}
      </ul>
</div>
      <Footer/>
    </div>
  );
};

export default WatchMovie;
