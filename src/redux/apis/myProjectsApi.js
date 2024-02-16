// import axios from "axios";
import API from '../../API/API.js';
const api = new API();
const endPoints = 'projects';
const endPointsone = 'all_projects';
export const createMyProjectsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoints}`, users);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const loadMyProjectsApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
    try {
      const result = await api.get(`${endPointsone}`,body);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const deleteMyProjectsApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoints}/${userId}`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const updateMyProjectsApi = async (userId, userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.put(`${endPoints}/${userId}`, userInfo);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}


