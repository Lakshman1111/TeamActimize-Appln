import API from '../../API/API.js';
const api = new API();
export const loadPersonalWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/personal_details`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadEmergencyWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/emergency_details`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export const loadFamilyWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/family_details`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadSkillsWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/skills`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadWorkExperienceWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/work_experiences`;
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadBankWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/bank_details`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadProjectsWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/projects`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const loadLeaveBankWiseDetailsApi = async (id) => {
    const endPoints = `users/${id}/leave_banks`; 
    return new Promise(async (resolve, reject) => {
        try {
            const result = await api.get(`${endPoints}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}