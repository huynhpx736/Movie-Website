import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faList, faGlobe, faUsers } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/manage-movies">
            <FontAwesomeIcon icon={faFilm} />
            Quản lý phim
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-categories">
            <FontAwesomeIcon icon={faList} />
            Quản lý thể loại
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-countries">
            <FontAwesomeIcon icon={faGlobe} />
            Quản lý quốc gia
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-actors">
            <FontAwesomeIcon icon={faUsers} />
            Quản lý diễn viên
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
