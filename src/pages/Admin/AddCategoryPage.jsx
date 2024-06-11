import React, { useState } from 'react';
import { addCategory } from '../../Utils/api';

const AddCategoryPage = () => {
    const [categoryData, setCategoryData] = useState({
        // Khởi tạo state để lưu thông tin của thể loại phim mới
        name: ''
    });

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCategory(categoryData);
            // Xử lý khi thêm thể loại phim thành công, ví dụ: chuyển hướng người dùng đến trang danh sách thể loại
        } catch (error) {
            // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại phim
        }
    };

    return (
        <div className='main-content'>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={categoryData.name} onChange={handleChange} />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategoryPage;
