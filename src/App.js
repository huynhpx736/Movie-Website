import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import AppRoutes from './routes/Approute';


function App() {
  return (
    
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;



// import './App.css';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom'
// import React, { useState, useEffect } from 'react';
// import { getAuthToken } from '../src/Utils/api';

// import AppRoutes from './routes/Approute';

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//       // Kiểm tra xem người dùng đã đăng nhập chưa
//       const token = getAuthToken();
//       setIsLoggedIn(token !== null);
//   }, []);

//   return (
//       <Route
//           {...rest}
//           element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
//       />
//   );
// };

// function App() {
//   return (
    
//     <Router>
//       <div>
//         <AppRoutes />
//       </div>
//     </Router>
//   );
// }

// export default App;