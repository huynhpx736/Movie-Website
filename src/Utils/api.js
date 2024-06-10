import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("token", token);
    } else {
        window.localStorage.removeItem("token");
    }
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = async (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    try {
        const response = await axios({
            method: method,
            url: url,
            headers: headers,
            data: data
        });
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

const createAxiosRequest = async (method, url) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
};


export const login = async (username, password) => {
    try {
        const response = await axios.post('/api/login/signin', { username, password });
        const { token } = response.data; // Lấy token từ dữ liệu nhận được
        setAuthHeader(token); // Lưu token vào localStorage
        return response.data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const getMoviesForHomePage = async (loaiPhim) => {
    try {
        const response = await request('GET', `/api/movie/get-phim-trang-chu/${loaiPhim}`);
        return response; // Assuming the response contains the movie data
    } catch (error) {
        console.error('Error fetching movies for homepage:', error);
        throw error;
    }
};

// Thêm phim mới
export const addMovie = async (movieData) => {
    try {
        const response = await axios.post('/api/movie/create', movieData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Sửa thông tin phim
export const updateMovie = async (movieId, newData) => {
    try {
        const response = await axios.put(`/api/movie/update?id=${movieId}`, newData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xoá phim
export const deleteMovie = async (movieId) => {
    try {
        const response = await axios.delete(`/api/movie/delete?id=${movieId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllMovies = async () => createAxiosRequest('GET', '/api/movie/get-all');
export const getMovieDetail = async (movieId) => createAxiosRequest('GET', `/api/movie/${movieId}`);

export const getAllMoviesByCategory = async (category_id) => createAxiosRequest('GET', `/api/movie/get-all-by-category?category_id=${category_id}`);
export const getAllMoviesByCountry = async (country_id) => createAxiosRequest('GET', `/api/movie/get-all-by-country?country_id=${country_id}`);
export const getNewMovies = async (top) => createAxiosRequest('GET', `/api/movie/get-new-movies?top=${top}`);
export const getMoviesRandom = async (top) => createAxiosRequest('GET', `/api/movie/get-random?top=${top}`);
export const getAllCountries = async () => createAxiosRequest('GET', '/api/country/get-all');
export const getCountryDetail = async (countryId) => createAxiosRequest('GET', `/api/country/${countryId}`);
export const getAllCategories = async () => createAxiosRequest('GET', '/api/category/get-all');

export const getAllPersons = async () => createAxiosRequest('GET', '/api/person/get-all');
export const getPersonDetail = async (personId) => createAxiosRequest('GET', `/api/person/${personId}`);

// Thêm hàm API để quản lý diễn viên
export const addPerson = async (personData) => {
    try {
        const response = await axios.post('/api/person/create', personData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const updatePerson = async (personData) => {
    try {
        const response = await axios.put('/api/person/update', personData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePerson = async (personId) => {
    try {
        const response = await axios.delete(`/api/person/delete?id=${personId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getCategoryNameById = async (category_id) => {
    try {
        const token = getAuthToken();
        const category = await createAxiosRequest('GET', `/api/category/${category_id}`, token);
        return category.name; // Assuming the response contains a 'name' field
    } catch (error) {
        console.error('Error fetching category name:', error);
        throw error;
    }
};

//thêm thể loại phim
export const addCategory = async (categoryData) => {
    try {
        const response = await axios.post('/api/category/create', categoryData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Sửa quốc gia
export const updateCategory = async (id, newData) => {
    try {
        const response = await axios.put(`/api/category/update?id=${id}`, newData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xoá quốc gia
export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`/api/category/delete?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//thêm quốc gia
export const addCountry = async (countryData) => {
    try {
        const response = await axios.post('/api/country/create', countryData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Sửa quốc gia
export const updateCountry = async (id, newData) => {
    try {
        const response = await axios.put(`/api/country/update?id=${id}`, newData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xoá quốc gia
export const deleteCountry = async (id) => {
    try {
        const response = await axios.delete(`/api/country/delete?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
