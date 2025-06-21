// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // ← note the `/api` prefix
//   withCredentials: true,
// });

// export default api;


// new chang 

// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });



import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});


// Attach Authorization header automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
