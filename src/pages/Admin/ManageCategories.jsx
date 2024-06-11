import React, { useState, useEffect } from 'react';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../../Utils/api';
import Sidebar from './Sidebar';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const newCategoryData = { name: newCategoryName };
      await addCategory(newCategoryData);
      fetchCategories();
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const updatedCategoryData = { categoryId: editCategoryId, name: editCategoryName };
      await updateCategory(editCategoryId, updatedCategoryData);
      fetchCategories();
      setEditCategoryId(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (id, name) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  return (
    <div className='main-content'>
      <Sidebar/>
      <h1>Manage Categories</h1>
      <div>
        <h2>Add New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>
      <div>
        <h2>List of Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>
              {editCategoryId === category.categoryId ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                  />
                  <button onClick={handleUpdateCategory}>Save</button>
                </>
              ) : (
                <>
                  {category.name}
                  <button onClick={() => handleEditCategory(category.categoryId, category.name)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(category.categoryId)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCategories;
