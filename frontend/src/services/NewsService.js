import APIService from './APIService';
import { Helper } from '../utils/helper';
import endPoints from './EndPoints';

const newsPerPage = Helper.config.articlesPerPage;


class NewsServiceClass {

  async getSiteData() {
    try {
      const response = await APIService.getApiService().get(endPoints.news.siteData);

      // If not successfull then return
      if (!response.data.success) return response.data

      return response.data;

    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Failed to fetch the site data"));

    }
  }

  async getNewsWithFilters(page = 1, filters = {}, pageSize = newsPerPage) {

    // If filters are not provided then set it to empty object
    filters = filters || {};

    try {
      const response = await APIService.getApiService().post(endPoints.news.newsWithFilters, {
        page,
        pageSize,
        ...filters,
      });
     
      // If not successfull then return
      if (!response.data.success) return response.data

      return response.data;
      
    } catch (error) {
      return Helper.returnObj(false, APIService.getErrorMessage(error, "Failed to fetch news"));
    }
  }

  // my feed
  async getMyFeed(page = 1, filters = {}, pageSize = newsPerPage) {

    // If filters are not provided then set it to empty object
    filters = filters || {};

    try {
      const response = await APIService.getApiService().post(endPoints.news.myFeed, {
        page,
        pageSize,
        ...filters
      });
      
      // If not successfull then return
      if (!response.data.success) return response.data

      return response.data;
      
    } catch (error) {

      return Helper.returnObj(false, APIService.getErrorMessage(error, "Failed to get my news feed"));

    }

  }
  
}

const NewsService = new NewsServiceClass();

export default  NewsService; // Export as a singleton instance
