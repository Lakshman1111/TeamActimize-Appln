import API from '../../API/API.js';
const api = new API();
const endPoints = 'personal_details';
const endPointsone = 'profile_pic_change';
export const createUserApi = async (users) => {
    return new Promise(async (resolve, reject) => {
        try {
          const result = await api.post(`${endPoints}`,users);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      });
  }
  export const createProfileApi = async (users) => {
      return new Promise(async (resolve, reject) => {
          try {
            var body = {
              profile_pic: users,
              isMultipart: true
            }
            const result = await api.post(`${endPointsone}`,body);
            resolve(result);
          } catch(error) {
            reject(error);
          }
        });
    }

    