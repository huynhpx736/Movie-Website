// import React, { useState, useEffect } from 'react';
// import { getAllMovies, deleteMovie, addMovie } from '../../Utils/api';
// import Sidebar from './Sidebar';

// const ManageMovies = () => {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [newMovie, setNewMovie] = useState({
//     name: '',
//     movieContent: '',
//     episodes: 0,
//     movieSchedule: 0,
//     image: '',
//     countryId: 1,
//     star: 0,
//     price: 0,
//     views: 0,
//     status: 1,
//     episodeList: [],
//     categories: [],
//     persons: []
//   });

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const data = await getAllMovies();
//       setMovies(data);
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };

//   const handleEdit = (movie) => {
//     setSelectedMovie(movie);
//   };

//   const handleDelete = async (movieId) => {
//     try {
//       await deleteMovie(movieId);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };

//   const handleAddMovie = async () => {
//     try {
//       await addMovie(newMovie);
//       fetchMovies();
//       setNewMovie({
//         name: '',
//         movieContent: '',
//         episodes: 0,
//         movieSchedule: 0,
//         image: '',
//         countryId: 1,
//         star: 0,
//         price: 0,
//         views: 0,
//         status: 1,
//         episodeList: [],
//         categories: [],
//         persons: []
//       });
//     } catch (error) {
//       console.error('Error adding movie:', error);
//     }
//   };

//   return (
//     <div>
//         <Sidebar/>
//       <h1>Quản lý phim</h1>
//       <div>
//         <h2>Thêm phim mới</h2>
//         <input
//           type="text"
//           placeholder="Tên phim"
//           value={newMovie.name}
//           onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
//         />
//         {/* Add more input fields for other movie attributes */}
//         <button onClick={handleAddMovie}>Thêm</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tên phim</th>
//             <th>Nội dung phim</th>
//             <th>Số tập</th>
//             <th>Lịch chiếu</th>
//             <th>Quốc gia</th>
//             <th>Số sao</th>
//             <th>Giá</th>
//             <th>Lượt xem</th>
//             <th>Trạng thái</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map(movie => (
//             <tr key={movie.movieId}>
//               <td>{movie.movieId}</td>
//               <td>{movie.name}</td>
//               <td>{movie.movieContent}</td>
//               <td>{movie.episodes}</td>
//               <td>{movie.movieSchedule}</td>
//               <td>{movie.country.name}</td>
//               <td>{movie.star}</td>
//               <td>{movie.price}</td>
//               <td>{movie.views}</td>
//               <td>{movie.status === 1 ? 'Active' : 'Inactive'}</td>
//               <td>
//                 <button onClick={() => handleEdit(movie)}>Edit</button>
//                 <button onClick={() => handleDelete(movie.movieId)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for editing */}
//       {selectedMovie && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setSelectedMovie(null)}>&times;</span>
//             <h2>Edit Movie</h2>
//             {/* Add form fields for editing */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageMovies;


import React, { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie, addMovie, updateMovie } from '../../Utils/api';
import Sidebar from './Sidebar';
import './ManageMovie.css'

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    name: '',
    movieContent: '',
    episodes: 0,
    movieSchedule: 0,
    image: '',
    countryId: 1,
    star: 0,
    price: 0,
    views: 0,
    status: 1,
    episodeList: [],
    categories: [],
    persons: []
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      await addMovie(newMovie);
      fetchMovies();
      resetNewMovie();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      await updateMovie(selectedMovie.movieId, selectedMovie);
      fetchMovies();
      setSelectedMovie(null);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const resetNewMovie = () => {
    setNewMovie({
      name: '',
      movieContent: '',
      episodes: 0,
      movieSchedule: 0,
      image: '',
      countryId: 1,
      star: 0,
      price: 0,
      views: 0,
      status: 1,
      episodeList: [],
      categories: [],
      persons: []
    });
  };

  return (
    <div className='main-content'>
        <Sidebar/>
      <h1>Quản lý phim</h1>
      <div>
        <h2>Thêm phim mới</h2>
        <input
          type="text"
          placeholder="Tên phim"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nội dung phim"
          value={newMovie.movieContent}
          onChange={(e) => setNewMovie({ ...newMovie, movieContent: e.target.value })}
        />
        {/* Add more input fields for other movie attributes */}
        <button onClick={handleAddMovie}>Thêm</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Nội dung phim</th>
            <th>Số tập</th>
            <th>Lịch chiếu</th>
            <th>Quốc gia</th>
            <th>Số sao</th>
            <th>Giá</th>
            <th>Lượt xem</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.movieId}>
              <td>{movie.movieId}</td>
              <td>{movie.name}</td>
              <td>{movie.movieContent}</td>
              <td>{movie.episodes}</td>
              <td>{movie.movieSchedule}</td>
              <td>{movie.country.name}</td>
              <td>{movie.star}</td>
              <td>{movie.price}</td>
              <td>{movie.views}</td>
              <td>{movie.status === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie.movieId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedMovie(null)}>&times;</span>
            <h2>Edit Movie</h2>
            <input
              type="text"
              placeholder="Tên phim"
              value={selectedMovie.name}
              onChange={(e) => setSelectedMovie({ ...selectedMovie, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nội dung phim"
              value={selectedMovie.movieContent}
              onChange={(e) => setSelectedMovie({ ...selectedMovie, movieContent: e.target.value })}
            />
            {/* Add more input fields for other movie attributes */}
            <button onClick={handleUpdateMovie}>Cập nhật</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
