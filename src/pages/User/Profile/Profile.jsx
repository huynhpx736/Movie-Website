// import React, { useState, useRef } from 'react';
// import { uploadUserAvatar, updateUserInfo } from '../../../Utils/api';
// import defaultAvatar from '../../../assets/img/default-avatar.jpg';
// import './Profile.css';

// import Header from '../../../components/Header/Header';
// import Footer from '../../../components/Footer/Footer';

// const Profile = () => {
//   const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [updatedUserInfo, setUpdatedUserInfo] = useState({
//     name: userInfo.name,
//     email: userInfo.email,
//     money: userInfo.money
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [previewSrc, setPreviewSrc] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     setAvatarFile(file);
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setPreviewSrc(previewURL);
//     } else {
//       setPreviewSrc(null);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append('fileUpload', avatarFile);
//       formData.append('username', userInfo.username);

//       const response = await uploadUserAvatar(formData);
//       if (response.success) {
//         setUserInfo({ ...userInfo, avatar: response.avatar });
//         localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, avatar: response.avatar }));
//         setPreviewSrc(null);
//       } else {
//         console.error('Error uploading avatar:', response.message);
//       }
//     } catch (error) {
//       console.error('Error uploading avatar:', error);
//     } finally {
//       setUploading(false);
//       setAvatarFile(null);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedUserInfo({
//       ...updatedUserInfo,
//       [name]: value
//     });
//   };

//   const handleUpdateUserInfo = async () => {
//     try {
//       const response = await updateUserInfo(userInfo.username, updatedUserInfo);
//       if (response.success) {
//         setUserInfo({
//           ...userInfo,
//           name: updatedUserInfo.name,
//           email: updatedUserInfo.email,
//           money: updatedUserInfo.money
//         });
//         localStorage.setItem('userInfo', JSON.stringify({
//           ...userInfo,
//           name: updatedUserInfo.name,
//           email: updatedUserInfo.email,
//           money: updatedUserInfo.money
//         }));
//         setEditMode(false);
//       } else {
//         console.error('Error updating user info:', response.message);
//       }
//     } catch (error) {
//       console.error('Error updating user info:', error);
//     }
//   };

//   return (
//     <div className='mainBodyUser'>
//       <Header />
//       <div className="profile-container">
//         <div className="avatar-section">
//           {uploading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             <img
//               src={previewSrc || (userInfo?.avatar ? `${process.env.REACT_APP_UPLOAD_URL}/${userInfo.avatar}` : defaultAvatar)}
//               alt="Avatar"
//               className="avatar"
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleAvatarChange}
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//           />
//           <button onClick={() => fileInputRef.current.click()}>Đổi</button>
//           {avatarFile && <button onClick={handleUpload} disabled={uploading}>Tải lên</button>}
//         </div>
//         <div className="info-section">
//           <h2>Thông tin tài khoản</h2>
//           {editMode ? (
//             <div className="edit-form">
//               <label>
//                 <span>Họ tên:</span>
//                 <input type="text" name="name" value={updatedUserInfo.name} onChange={handleInputChange} />
//               </label>
//               <label>
//                 <span>Email:</span>
//                 <input type="email" name="email" value={updatedUserInfo.email} onChange={handleInputChange} />
//               </label>
//               <label>
//                 <span>Tiền:</span>
//                 <input type="number" name="money" value={updatedUserInfo.money} onChange={handleInputChange} />
//               </label>
//               <button onClick={handleUpdateUserInfo}>Lưu</button>
//               <button onClick={() => setEditMode(false)}>Huỷ</button>
//             </div>
//           ) : (
//             <div className="user-info">
//               <p><strong>Tên:</strong> {userInfo?.name}</p>
//               <p><strong>Email:</strong> {userInfo?.email}</p>
//               {/* <p><strong>Money:</strong> {userInfo?.money}</p> */}
//               <button onClick={() => setEditMode(true)}>Sửa</button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;

















import React, { useState, useRef } from 'react';
import { uploadUserAvatar, updateUserInfo } from '../../../Utils/api';
import defaultAvatar from '../../../assets/img/default-avatar.jpg';
import './Profile.css';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: userInfo.username,
    name: userInfo.name,
    email: userInfo.email,
    money: userInfo.money
  });
  const [editMode, setEditMode] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewSrc(previewURL);
    } else {
      setPreviewSrc(null);
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('fileUpload', avatarFile);
      formData.append('username', userInfo.username);

      const response = await uploadUserAvatar(formData);
      if (response.success) {
        setUserInfo({ ...userInfo, avatar: response.avatar });
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, avatar: response.avatar }));
        setPreviewSrc(null);
      } else {
        console.error('Error uploading avatar:', response.message);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
      setAvatarFile(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value
    });
  };

  const handleUpdateUserInfo = async () => {
    try {
      const response = await updateUserInfo(updatedUserInfo);
      if (response.success) {
        setUserInfo({
          ...userInfo,
          username: userInfo.username,
          name: updatedUserInfo.name,
          email: updatedUserInfo.email,
          money: updatedUserInfo.money
        });

        setEditMode(false);
      } else {
        console.error('Error updating user info:', response.message);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className='mainBodyUser'>
      <Header />
      <div className="profile-container">
        <div className="avatar-section">
          {uploading ? (
            <div className="loading-spinner"></div>
          ) : (
            <img
              src={previewSrc || (userInfo?.avatar ? `${process.env.REACT_APP_UPLOAD_URL}/${userInfo.avatar}` : defaultAvatar)}
              alt="Avatar"
              className="avatar"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current.click()}>Đổi</button>
          {avatarFile && <button onClick={handleUpload} disabled={uploading}>Tải lên</button>}
        </div>
        <div className="info-section">
          <h2>Thông tin tài khoản</h2>
          {editMode ? (
            <div className="edit-form">
              <label>
                <span>Họ tên:</span>
                <input type="text" name="name" value={updatedUserInfo.name} onChange={handleInputChange} />
              </label>
              <label>
                <span>Email:</span>
                <input type="email" name="email" value={updatedUserInfo.email} onChange={handleInputChange} />
              </label>
              {/* <label>
                <span>Tiền:</span>
                <input type="number" name="money" value={updatedUserInfo.money} onChange={handleInputChange} />
              </label> */}
              <button className="change-avatar" onClick={handleUpdateUserInfo}>Lưu</button>
              <button className="cancel" onClick={() => setEditMode(false)}>Huỷ</button>
            </div>
          ) : (
            <div className="user-info">
              <p><strong>Tên:</strong> {userInfo?.name}</p>
              <p><strong>Email:</strong> {userInfo?.email}</p>
              <p><strong>Money:</strong> {userInfo?.money}</p>
              <button onClick={() => setEditMode(true)}>Sửa</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
