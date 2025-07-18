import axios from './axiosInstance';

export async function getCompanies() {
    try {
        const res = await axios.get('/companies');
        return res.data; // your backend data
    } catch (error) {
        throw new Error(`Failed to fetch companies: ${error.message}`);
    }
}

export async function createCompany(company) {
    try {
        const res = await axios.post('/companies', company);
        return res.data;
    } catch (error) {
        throw new Error(`Failed to create company: ${error.message}`);
    }
}
