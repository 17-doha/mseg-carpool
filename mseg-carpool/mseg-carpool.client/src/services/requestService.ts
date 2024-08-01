import axios from 'axios';

const API_URL = 'http://localhost:5062/api/rides';

export const getRequestsForDriver = async (driverAzureId) => {
    try {
        const response = await axios.get(`${API_URL}/requests/${driverAzureId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error;
    }
};

export const acceptRequest = async (requestId) => {
    try {
        await axios.put(`${API_URL}/requests/${requestId}/accept`);
    } catch (error) {
        console.error('Error accepting request:', error);
        throw error;
    }
};

export const deleteRequest = async (requestId) => {
    try {
        await axios.delete(`${API_URL}/requests/${requestId}`);
    } catch (error) {
        console.error('Error deleting request:', error);
        throw error;
    }
};
