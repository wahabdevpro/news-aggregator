import { Helper } from '../utils/helper';
import APIService from './APIService';
import { loginSuccess, logoutSuccess } from '../redux/slices/authSlice';
import endPoints from './EndPoints';


class AuthServiceClass {


  async register(email, password, name) {
    try {
      const response = await APIService.getApiService().post(endPoints.auth.register, {
        email,
        password,
        name,
      });

      // If not successfull then return
      if (!response.data.success) return response.data

      // We are here it means success
      this._setData(response.data.data);

      return response.data;

    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Registration failed"));

    }

  }


  async login(email, password) {
    try {

      const response = await APIService.getApiService().post(endPoints.auth.login, { email, password });

      // If not successfull then return
      if (!response.data.success) return response.data

      // Set data
      this._setData(response.data.data);

      return response.data;

    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Login failed"));
    }
  }

  async logout() {
    try {

      sessionStorage.removeItem('access_token'); // Remove the token from localStorage
      sessionStorage.removeItem('user'); // Remove the user from localStorage

      // Dispatch the logout success action
      APIService.getApiService().dispatch(logoutSuccess());

      APIService.getApiService().post(endPoints.auth.logout);

    } catch (error) {

      return error.response?.data || 'Logout failed';
    }
  }


  /**
   * This will set the redux state if the user is logged in
   */
  initAuth() {
    const token = sessionStorage.getItem('access_token');
    const user = sessionStorage.getItem('user');

    if (token && user) {
      APIService.getApiService().dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    }
  }

   isAuthenticated() {
    const token = sessionStorage.getItem('access_token');
    return !!token; // Return true if the token exists
  }

   getToken() {
    return sessionStorage.getItem('access_token');
  }

  getUserData() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parse the user object
  }

  _setData(data, redirect = "/") {

     // Set the token to the session storage
     sessionStorage.setItem('access_token', data.token);
     sessionStorage.setItem('user', JSON.stringify(data.user));

     // Dispatch the login success action
     APIService.getApiService().dispatch(loginSuccess(data));

     if (redirect) {
       APIService.getApiService().navigate(redirect);
     }

  }

}


const AuthService = new AuthServiceClass();

export default AuthService; // Export as a singleton instance
