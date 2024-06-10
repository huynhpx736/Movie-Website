import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../Utils/api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await login(username, password);
            const token = response.token;
            
            // Lưu token vào localStorage
            localStorage.setItem('token', token);
            
            // Điều hướng đến trang chính
            history.push('/');
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
