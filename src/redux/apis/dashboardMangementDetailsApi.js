
import API from '../../API/API.js';
const api = new API();
const endPoints = 'manager_dashboard';
export const getDashboardMangementDetailsApi = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


