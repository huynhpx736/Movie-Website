import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllCountries, getAllCategories } from '../../Utils/api';
import './Header.css';
import { FaUser, FaAngleDown } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getAllCategories();
                const countriesData = await getAllCountries();
                setCategories(categoriesData);
                setCountries(countriesData);
                // const token = localStorage.getItem('token');
                // if (token) {
                //     setIsLoggedIn(true);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // Sử dụng useRef để xác định khi nào click ra ngoài dropdown
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Kiểm tra xem click có trong dropdown hay không
                // Nếu không, đóng dropdown
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        // setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <header className="header">
            <div className="logo-container">
                <a href="/"><img className='logo' src="/hayphim.png" alt="" /></a>
            </div>
            
            <nav className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/phim-moi">Phim mới</Link></li>
                    <li><Link to="/the-loai/1">Phim lẻ</Link></li>
                    <li><Link to="/the-loai/2">Phim bộ</Link></li>
                    <li className="dropdown">
                        <span>Thể loại</span>
                        <div className="dropdown-content">
                            {categories.map(category => (
                                <Link key={category.id} to={`/the-loai/${category.categoryId}`}>
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <FaAngleDown className="dropdown-icon" />
                    </li>
                    <li className="dropdown">
                        <span>Quốc gia</span>
                        <div className="dropdown-content">
                            {countries.map(country => (
                                <Link key={country.id} to={`/quoc-gia/${country.countryId}`}>
                                    {country.name}
                                </Link>
                            ))}
                        </div>
                        <FaAngleDown className="dropdown-icon" />
                    </li>
                </ul>
            </nav>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button type="button">Tìm kiếm</button> */}
            </div>

            <ul className="user-actions">
                <li ref={dropdownRef} className="dropdown">
                    <div onClick={toggleDropdown} className="dropdown-toggle">
                        <FaUser className="user-icon" />
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <Link to="/profile">Tài khoản</Link>
                            <Link to="/change-pass">Đổi mật khẩu</Link>
                            <Link to="/bought-movies">Phim đã mua</Link>
                            <Link to="/saved-movies">Phim đã lưu</Link>
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Header;