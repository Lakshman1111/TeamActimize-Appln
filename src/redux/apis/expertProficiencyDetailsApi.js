import API from '../../API/API.js';
const api = new API();
const endPoints = 'all_users_with_skills';
const endPointsOne = 'search_users_related_to_skill';
export const loadProficiencyDetailsApi = async (pageno,skillName) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const loadProficiencySelectDetailsApi = async (skillName,pageno) => {
    return new Promise(async (resolve, reject) => {
        try {
          var body = {
            skill_name: skillName,
            page: pageno,
            isMultipart: true
          }
          const result = await api.get(`${endPointsOne}`, body);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      });
  }