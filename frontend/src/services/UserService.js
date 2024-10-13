import { Helper } from '../utils/helper';
import APIService from './APIService';
import endPoints from './EndPoints';


class UserServiceClass {

  async getPreferences() {
    try {

      const response = await APIService.getApiService().get(endPoints.user.preferences.get);

      // If not successfull then return
      if (!response.data.success) return response.data

      return response.data;

    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Failed to fetch preferences"));

    }
  }

  async setPreferences(preferences) {
    try {

      const response = await APIService.getApiService().post(endPoints.user.preferences.set, preferences);

      // If not successfull then return
      if (!response.data.success) return response.data

      return response.data;

    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Failed to set preferences"));

    }
  }

}

const UserService = new UserServiceClass();

export default UserService; // Export as a singleton instance
