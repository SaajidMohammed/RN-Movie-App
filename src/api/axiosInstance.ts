import axios from 'axios';

// Replace with your actual Bearer Token from TMDB Settings
const TMDB_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTY5NDhhYmQwNTk0ZmRkNWU4OTU5M2FkYjIxODM5NSIsIm5iZiI6MTc2ODM3NDM3Mi40NDksInN1YiI6IjY5Njc0MDY0NWYwZmM2N2JhMGViZmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.khdzPWcXbMZys-BMDctB-Xnzer0c1wrTFVbVMPpmWyg'; 

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
  },
});

// Optional: Add an interceptor to log errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.status_message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;