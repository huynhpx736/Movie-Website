import React, { useState, useEffect } from 'react';
import { getAllCountries, addCountry, updateCountry, deleteCountry } from '../../Utils/api';
import Sidebar from './Sidebar';

const ManageCountries = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState('');
  const [editCountryId, setEditCountryId] = useState(null);
  const [editCountryName, setEditCountryName] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleAddCountry = async () => {
    try {
      const newCountryData = { name: newCountryName };
      await addCountry(newCountryData);
      fetchCountries();
      setNewCountryName('');
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleUpdateCountry = async () => {
    try {
      const updatedCountryData = { countryId: editCountryId, name: editCountryName };
      await updateCountry(editCountryId, updatedCountryData);
      fetchCountries();
      setEditCountryId(null);
      setEditCountryName('');
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const handleEditCountry = (id, name) => {
    setEditCountryId(id);
    setEditCountryName(name);
  };

  return (
    <div className='main-content'>
      <Sidebar/>
      <h1>Manage Countries</h1>
      <div>
        <h2>Add New Country</h2>
        <input
          type="text"
          value={newCountryName}
          onChange={(e) => setNewCountryName(e.target.value)}
        />
        <button onClick={handleAddCountry}>Add</button>
      </div>
      <div>
        <h2>List of Countries</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.countryId}>
              {editCountryId === country.countryId ? (
                <>
                  <input
                    type="text"
                    value={editCountryName}
                    onChange={(e) => setEditCountryName(e.target.value)}
                  />
                  <button onClick={handleUpdateCountry}>Save</button>
                </>
              ) : (
                <>
                  {country.name}
                  <button onClick={() => handleEditCountry(country.countryId, country.name)}>Edit</button>
                  <button onClick={() => handleDeleteCountry(country.countryId)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCountries;
