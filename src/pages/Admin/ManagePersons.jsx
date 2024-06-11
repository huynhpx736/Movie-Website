// import React, { useState, useEffect } from 'react';
// import { getAllPersons, addPerson, updatePerson, deletePerson } from '../../Utils/api'

// const ManagePersons = () => {
//   const [persons, setPersons] = useState([]);
//   const [newPerson, setNewPerson] = useState({
//     name: '',
//     gender: true,
//     dayOfBirth: '',
//     image: '',
//     describe: '',
//     countryId: ''
//   });
//   const [editPerson, setEditPerson] = useState(null);

//   useEffect(() => {
//     fetchPersons();
//   }, []);

//   const fetchPersons = async () => {
//     try {
//       const data = await getAllPersons();
//       setPersons(data);
//     } catch (error) {
//       console.error('Error fetching persons:', error);
//     }
//   };

//   const handleAddPerson = async () => {
//     try {
//       await addPerson(newPerson);
//       fetchPersons();
//       setNewPerson({
//         name: '',
//         gender: true,
//         dayOfBirth: '',
//         image: '',
//         describe: '',
//         countryId: ''
//       });
//     } catch (error) {
//       console.error('Error adding person:', error);
//     }
//   };

//   const handleUpdatePerson = async () => {
//     try {
//       await updatePerson(editPerson);
//       fetchPersons();
//       setEditPerson(null);
//     } catch (error) {
//       console.error('Error updating person:', error);
//     }
//   };

//   const handleDeletePerson = async (id) => {
//     try {
//       await deletePerson(id);
//       fetchPersons();
//     } catch (error) {
//       console.error('Error deleting person:', error);
//     }
//   };

//   const handleEditPerson = (person) => {
//     setEditPerson(person);
//   };

//   return (
//     <div>
//       <h1>Manage Persons</h1>
//       <div>
//         <h2>Add New Person</h2>
//         <input
//           type="text"
//           value={newPerson.name}
//           onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
//         />

//         <input
//           type="text"
//           value={newPerson.image}
//           onChange={(e) => setNewPerson({ ...newPerson, image: e.target.value })}
//         />
//         {/* Other input fields for gender, dayOfBirth, image, describe, countryId */}
//         <button onClick={handleAddPerson}>Add</button>
//       </div>
//       <div>
//         <h2>List of Persons</h2>
//         <ul>
//           {persons.map((person) => (
//             <li key={person.personId}>
//               {editPerson && editPerson.personId === person.personId ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={editPerson.name}
//                     onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//                   />
//                   {/* Other input fields for gender, dayOfBirth, image, describe, countryId */}
//                   <button onClick={handleUpdatePerson}>Save</button>
//                 </div>
//               ) : (
//                 <div>
//                   {person.name}
//                   {/* Display other info */}
//                   <button onClick={() => handleEditPerson(person)}>Edit</button>
//                   <button onClick={() => handleDeletePerson(person.personId)}>Delete</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ManagePersons;







// import React, { useState, useEffect } from 'react';
// import { getAllPersons, addPerson, updatePerson, deletePerson } from '../../Utils/api'

// const ManagePersons = () => {
//   const [persons, setPersons] = useState([]);
//   const [newPerson, setNewPerson] = useState({
//     name: '',
//     gender: true,
//     dayOfBirth: '',
//     image: null, // Initialize image as null
//     describe: '',
//     countryId: ''
//   });
//   const [editPerson, setEditPerson] = useState(null);

//   useEffect(() => {
//     fetchPersons();
//   }, []);

//   const fetchPersons = async () => {
//     try {
//       const data = await getAllPersons();
//       setPersons(data);
//     } catch (error) {
//       console.error('Error fetching persons:', error);
//     }
//   };

//   const handleAddPerson = async () => {
//     try {
//       const response = await addPerson(newPerson);
//       if (response) {
//         fetchPersons();
//         setNewPerson({
//           name: '',
//           gender: true,
//           dayOfBirth: '',
//           image: null,
//           describe: '',
//           countryId: ''
//         });
//       } else {
//         console.error('Person with the same name already exists!');
//       }
//     } catch (error) {
//       console.error('Error adding person:', error);
//     }
//   };

//   const handleUpdatePerson = async () => {
//     try {
//       await updatePerson(editPerson);
//       fetchPersons();
//       setEditPerson(null);
//     } catch (error) {
//       console.error('Error updating person:', error);
//     }
//   };

//   const handleDeletePerson = async (id) => {
//     try {
//       await deletePerson(id);
//       fetchPersons();
//     } catch (error) {
//       console.error('Error deleting person:', error);
//     }
//   };

//   const handleEditPerson = (person) => {
//     setEditPerson(person);
//   };

//   return (
//     <div>
//       <h1>Manage Persons</h1>
//       <div>
//         <h2>Add New Person</h2>
//         <input
//           type="text"
//           value={newPerson.name}
//           onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
//         />
//         <input
//             type="text"
//             value={newPerson.image}
//             onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//         />
//         {/* Other input fields for gender, dayOfBirth, describe, countryId */}
//         <button onClick={handleAddPerson}>Add</button>
//       </div>
//       <div>
//         <h2>List of Persons</h2>
//         <ul>
//           {persons.map((person) => (
//             <li key={person.personId}>
//               {editPerson && editPerson.personId === person.personId ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={editPerson.name}
//                     onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//                   />
//                   {/* <input
//                     type="file"
//                     onChange={(e) => setEditPerson({ ...editPerson, image: e.target.files[0] })}
//                   /> */}

//                   <input
//                     type="text"
//                     value={editPerson.image}
//                     onChange={(e) => setEditPerson({ ...editPerson, image: e.target.value })}
//                   />
                 
//                   <button onClick={handleUpdatePerson}>Save</button>
//                 </div>
//               ) : (
//                 <div>
//                   {person.name}
//                   {/* Display other info */}
//                   <button onClick={() => handleEditPerson(person)}>Edit</button>
//                   <button onClick={() => handleDeletePerson(person.personId)}>Delete</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ManagePersons;





// import React, { useState, useEffect } from 'react';
// import { getAllPersons, addPerson, updatePerson, deletePerson } from '../../Utils/api'

// const ManagePersons = () => {
//   const [persons, setPersons] = useState([]);
//   const [newPerson, setNewPerson] = useState({
//     name: '',
//     image: ''
//   });
//   const [editPerson, setEditPerson] = useState(null);

//   useEffect(() => {
//     fetchPersons();
//   }, []);

//   const fetchPersons = async () => {
//     try {
//       const data = await getAllPersons();
//       setPersons(data);
//     } catch (error) {
//       console.error('Error fetching persons:', error);
//     }
//   };

//   const handleAddPerson = async () => {
//     try {
//       await addPerson(newPerson);
//       fetchPersons();
//       setNewPerson({ name: '', image: '' });
//     } catch (error) {
//       console.error('Error adding person:', error);
//     }
//   };

//   const handleUpdatePerson = async () => {
//     try {
//       await updatePerson(editPerson);
//       fetchPersons();
//       setEditPerson(null);
//     } catch (error) {
//       console.error('Error updating person:', error);
//     }
//   };

//   const handleDeletePerson = async (id) => {
//     try {
//       await deletePerson(id);
//       fetchPersons();
//     } catch (error) {
//       console.error('Error deleting person:', error);
//     }
//   };

//   const handleEditPerson = (person) => {
//     setEditPerson(person);
//   };

//   return (
//     <div>
//       <h1>Manage Persons</h1>
//       <div>
//         <h2>Add New Person</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newPerson.name}
//           onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newPerson.image}
//           onChange={(e) => setNewPerson({ ...newPerson, image: e.target.value })}
//         />
//         <button onClick={handleAddPerson}>Add</button>
//       </div>
//       <div>
//         <h2>List of Persons</h2>
//         <ul>
//           {persons.map((person) => (
//             <li key={person.personId}>
//               {editPerson && editPerson.personId === person.personId ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={editPerson.name}
//                     onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     value={editPerson.image}
//                     onChange={(e) => setEditPerson({ ...editPerson, image: e.target.value })}
//                   />
//                   <button onClick={handleUpdatePerson}>Save</button>
//                 </div>
//               ) : (
//                 <div>
//                   {person.name}
//                   <img src={person.image} alt={person.name} />
//                   <button onClick={() => handleEditPerson(person)}>Edit</button>
//                   <button onClick={() => handleDeletePerson(person.personId)}>Delete</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ManagePersons;





// import React, { useState } from 'react';
// import { addPerson } from '../../Utils/api'

// function AddPersonForm() {
//     const [personData, setPersonData] = useState({
//         name: '',
//         gender: 1,
//         dayOfBirth: '',
//         image: '',
//         describe: '',
//         countryId: 1
//     });

//     // Xử lý sự kiện khi người dùng thay đổi giá trị của các trường dữ liệu
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPersonData({ ...personData, [name]: value });
//     };

//     // Xử lý sự kiện khi người dùng gửi biểu mẫu
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Ngăn chặn trình duyệt gửi yêu cầu mặc định

//         try {
//             // Gọi hàm addPerson từ file api.js để thêm một đối tượng Person mới
//             await addPerson(personData);
//             // Nếu thêm thành công, làm sạch trường dữ liệu và hiển thị một thông báo thành công
//             setPersonData({
//                 name: '',
//                 gender: 1,
//                 dayOfBirth: '',
//                 image: '',
//                 describe: '',
//                 countryId: 1
//             });
//             alert('Person created successfully!');
//         } catch (error) {
//             console.error('Error creating person:', error);
//             alert('Failed to create person. Please try again later.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" name="name" value={personData.name} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Gender:
//                 <input type="number" name="gender" value={personData.gender} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Day of Birth:
//                 <input type="text" name="dayOfBirth" value={personData.dayOfBirth} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Image:
//                 <input type="text" name="image" value={personData.image} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Describe:
//                 <input type="text" name="describe" value={personData.describe} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Country ID:
//                 <input type="number" name="countryId" value={personData.countryId} onChange={handleChange} />
//             </label>
//             <br />
//             <button type="submit">Create Person</button>
//         </form>
//     );
// }

// export default AddPersonForm;



// import React, { useState, useEffect } from 'react';
// import { addPerson, getAllCountries } from '../../Utils/api'

// function AddPersonForm() {
//     const [personData, setPersonData] = useState({
//         name: '',
//         gender: 1,
//         dayOfBirth: '',
//         image: '',
//         describe: '',
//         countryId: 1
//     });
//     const [countries, setCountries] = useState([]);

//     useEffect(() => {
//         // Gọi hàm getAllCountries từ file api.js để lấy danh sách quốc gia từ API
//         const fetchCountries = async () => {
//             try {
//                 const countriesData = await getAllCountries();
//                 setCountries(countriesData);
//             } catch (error) {
//                 console.error('Error fetching countries:', error);
//             }
//         };
//         fetchCountries();
//     }, []);

//     // Xử lý sự kiện khi người dùng thay đổi giá trị của các trường dữ liệu
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPersonData({ ...personData, [name]: value });
//     };

//     // Xử lý sự kiện khi người dùng gửi biểu mẫu
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Ngăn chặn trình duyệt gửi yêu cầu mặc định

//         try {
//             // Gọi hàm addPerson từ file api.js để thêm một đối tượng Person mới
//             await addPerson(personData);
//             // Nếu thêm thành công, làm sạch trường dữ liệu và hiển thị một thông báo thành công
//             setPersonData({
//                 name: '',
//                 gender: '',
//                 dayOfBirth: '',
//                 image: '',
//                 describe: '',
//                 countryId: 1
//             });
//             alert('Person created successfully!');
//         } catch (error) {
//             console.error('Error creating person:', error);
//             alert('Failed to create person. Please try again later.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" name="name" value={personData.name} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Gender:
//                 <input type="text" name="gender" value={personData.gender} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Day of Birth:
//                 <input type="text" name="dayOfBirth" value={personData.dayOfBirth} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Image:
//                 <input type="text" name="image" value={personData.image} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Describe:
//                 <input type="text" name="describe" value={personData.describe} onChange={handleChange} />
//             </label>
//             <br />
//             <label>
//                 Country:
//                 <select name="countryId" value={personData.countryId} onChange={handleChange}>
//                     {countries.map(country => (
//                         <option key={country.countryId} value={country.countryId}>{country.name}</option>
//                     ))}
//                 </select>
//             </label>
//             <br />
//             <button type="submit">Create Person</button>
//         </form>
//     );
// }

// export default AddPersonForm;













import React, { useState, useEffect } from 'react';
import { getAllPersons, addPerson, updatePerson, deletePerson } from '../../Utils/api';
import Slider from 'react-slick';
import Sidebar from './Sidebar';

const ManagePersons = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    gender: '',
    dayOfBirth: '',
    image: '',
    describe: '',
    countryId: 1
  });
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const data = await getAllPersons();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const handleAddPerson = async () => {
    try {
      await addPerson(newPerson);
      fetchPersons();
      setNewPerson({
        name: '',
        gender: '',
        dayOfBirth: '',
        image: '',
        describe: '',
        countryId: 1
      });
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleUpdatePerson = async () => {
    try {
      await updatePerson(editPerson);
      fetchPersons();
      setEditPerson(null);
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await deletePerson(id);
      fetchPersons();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleEditPerson = (person) => {
    setEditPerson(person);
  };

  return (
    <div className='main-content'>
        <Sidebar/>
      <h1>Manage Persons</h1>
      <div>
        <h2>Add New Person</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Link url"
          value={newPerson.image}
          onChange={(e) => setNewPerson({ ...newPerson, image: e.target.value })}
        />
        {/* Other input fields for gender, dayOfBirth, image, describe, countryId */}
        <button onClick={handleAddPerson}>Add</button>
      </div>
      <div>
        <h2>List of Persons</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.personId}>
              {editPerson && editPerson.personId === person.personId ? (
                <div>
                  <input
                    type="text"
                    value={editPerson.name}
                    onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
                  />
                  {/* Other input fields for gender, dayOfBirth, image, describe, countryId */}
                  <button onClick={handleUpdatePerson}>Save</button>
                </div>
              ) : (
                <div>
                  {person.name}
                  {/* Display other info */}
                  <button onClick={() => handleEditPerson(person)}>Edit</button>
                  <button onClick={() => handleDeletePerson(person.personId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePersons;
