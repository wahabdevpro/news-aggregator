import axios from 'axios';
import AuthService from './AuthService';
import localRoutes from '../utils/localRoutes';

class APIService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Enable this for Laravel Sanctum cookies
    });

    this.navigate = null; // Navigation function
    this.dipatch = null; // Redux dispatch function

  }

  // Function to set up Axios interceptors
  setupInterceptors(navigate, dispatch) {

    this.navigate = navigate;
    this.dispatch = dispatch;

    // Request Interceptor - Adds Authorization token to headers
    this.api.interceptors.request.use(
      (config) => {

        const token = AuthService.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor - Handles token expiry or unauthorized access
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token'); // Remove invalid token
          navigate(localRoutes.auth); // Redirect to login on unauthorized
        }
        return Promise.reject(error);
      }
    );
  }

  // Singleton instance function
  static getApiService() {
    if (!this.instance) {
      this.instance = new APIService();
    }
    return this.instance;
  }

  static getErrorMessage(error, defaultMsg = 'An error occurred') {
    if (error.response) {
      return error.response.data?.message || error.response.data?.error || error.response.data || defaultMsg;
    }
    return error.message;
  }

  // GET request
  async get(url, params = {}) {
    return this.api.get(url, { params });
  }

  // POST request
  async post(url, data) {
    return this.api.post(url, data);
  }

  // PUT request
  async put(url, data) {
    return this.api.put(url, data);
  }

  // DELETE request
  async delete(url) {
    return this.api.delete(url);
  }
}

export default APIService;
