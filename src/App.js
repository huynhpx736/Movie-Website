import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { isLoggedIn } from './Utils/api';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import AppRoutes from './routes/Approute';

function App() {
  useEffect(() => {
    const currentPath = window.location.pathname;
    // Kiểm tra nếu không phải trang login
    if (currentPath !== '/login'&&currentPath!=='/change-pass-otp'&&currentPath!=='/otp-verification' &&currentPath!=='/forgot-password'&& currentPath !== '/admin/login' && !isLoggedIn()) {
    // Nếu người dùng chưa đăng nhập và không phải trang login, chuyển hướng họ đến trang đăng nhập
      window.alert('Phiên đăng nhập đã hết hạn. Mời đăng nhập lại.');
      window.location.href = '/login';
    }
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;




// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';
// import { isLoggedIn } from './Utils/api';
// import AppRoutes from './routes/Approute';

// function App() {
//   useEffect(() => {
//     // Kiểm tra nếu không phải trang login và người dùng chưa đăng nhập
//     const currentPath = window.location.pathname;
//     // Set up Axios interceptor to handle 401 errors
//     const interceptor = axios.interceptors.response.use(
//       response => response,
//       error => {
//         if (error.response && error.response.status === 401 || !isLoggedIn() && currentPath !== '/login') {
//           // Nếu nhận được lỗi 401, chuyển hướng người dùng đến trang đăng nhập
//           window.alert('Phiên đăng nhập đã hết hạn. Mời đăng nhập lại.');
//           window.location.href = '/login';
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup interceptor when unmounting component
//     return () => {
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, []);

//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;
