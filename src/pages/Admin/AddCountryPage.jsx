import React, { useState, useEffect } from 'react';
import { addCountry, getAllCountries } from '../../Utils/api';

const AddCountryPage = () => {
    const [countryData, setCountryData] = useState({
        name: ''
    });
    const [message, setMessage] = useState(null); // State để lưu thông báo
    const [existingCountries, setExistingCountries] = useState([]); // State để lưu danh sách quốc gia hiện có

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countries = await getAllCountries(); // Lấy danh sách quốc gia
                setExistingCountries(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setCountryData({
            ...countryData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kiểm tra xem tên quốc gia đã tồn tại trong danh sách hay chưa
            const countryExists = existingCountries.some(country => country.name.toLowerCase() === countryData.name.toLowerCase());
            if (countryExists) {
                setMessage('Country name already exists.'); // Thông báo nếu tên quốc gia đã tồn tại
            } else {
                await addCountry(countryData);
                setMessage('Country added successfully.'); // Thông báo khi thêm quốc gia thành công
                setCountryData({ name: '' }); // Xóa dữ liệu nhập trong form
            }
        } catch (error) {
            setMessage('Error adding country.'); // Thông báo khi có lỗi xảy ra trong quá trình thêm
        }
    };

    return (
        <div>
            <h2>Add New Country</h2>
            {message && <p>{message}</p>} {/* Hiển thị thông báo nếu tồn tại */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={countryData.name} onChange={handleChange} />
                </div>
                <button type="submit">Add Country</button>
            </form>
        </div>
    );
};

export default AddCountryPage;
