import API from '../../API/API.js';
const api = new API();
const endPoints = 'users';

export const usersListApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoints}`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

  

  