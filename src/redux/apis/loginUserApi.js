import API from '../../API/API.js';
const api = new API();
const endPoints = 'login';
export const loginUserApi = async (users) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoints}`, users);
      resolve(result);
    const apiResultVariable = result; // Storing the result in a variable
    return apiResultVariable; // This line returns the result from the function
        } catch (error) {
      reject(error);
    }
  });
}

  

  