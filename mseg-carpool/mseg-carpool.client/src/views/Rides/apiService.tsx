import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5062/api';

// Interface definitions
interface RideDriver {
    azureID: string;
    name: string;
    email: string;
    mobileNumber: string;
    location: string;
    driverCar: string;
    driverCarPlate: string;
    driverCarColor: string;
}

interface Ride {
    id: number;
    origin: string;
    destination: string;
    availableSeats: number;
    rideDriver: RideDriver;
    departureTime: string;
    own: string;
    status: string;
    riders: Array<{
        azureID: string;
        name: string;
        email: string;
        mobileNumber: string;
        location: string;
    }>;
}

interface RideDto {
    origin: string;
    destination: string;
    availableSeats: number;
    departureTime: Date;
    coordinates: string;
}

interface User {
    id: string;
    points: number;
    name: string;
    email: string;
    mobileNumber: string;
    location: string;
    carModel: string;
    carType: string;
    carPlate: string;
    carColor: string;
}

export interface ApiResponse<T> {
    $id: string;
    $values: T;
}

// API service functions
const apiService = {
    getRidesByUserId: async (userId: string, currentTime: string): Promise<AxiosResponse<ApiResponse<Ride[]>>> => {
        const response = await axios.get<ApiResponse<Ride[]>>(
            `${API_BASE_URL}/rides/byUser/${userId}`,
            { params: { currentTime } }
        );
        return response;
    },

    getRideByAzureId: async (azureId: string, currentTime: string): Promise<AxiosResponse<ApiResponse<Ride[]>>> => {
        const response = await axios.get<ApiResponse<Ride[]>>(
            `${API_BASE_URL}/rides/byDriver/${azureId}`,
            { params: { currentTime } }
        );
        return response;
    },

    updateRide: (id: string, updatedRide: RideDto): Promise<AxiosResponse<Ride>> => {
        return axios.put<Ride>(`${API_BASE_URL}/rides/${id}`, updatedRide);
    },

    deleteRide: (id: number): Promise<AxiosResponse<void>> => {
        console.log(id);
        return axios.delete<void>(`${API_BASE_URL}/rides/${id}`);
    },

    getUserPoints: (azureId: string): Promise<AxiosResponse<User>> => {
        return axios.get<User>(`${API_BASE_URL}/users/points/${azureId}`);
    },

    cancelRequest: (rideId: number, azureId: string): Promise<AxiosResponse<void>> => {
        return axios.delete<void>(`${API_BASE_URL}/rides/cancel-request/${rideId}/${azureId}`);
    },

    getUserById: (azureId: string): Promise<AxiosResponse<User>> => {
        return axios.get<User>(`${API_BASE_URL}/users/${azureId}`);
    },

    getRides: async (currentTime: string): Promise<AxiosResponse<ApiResponse<Ride[]>>> => {
        const response = await axios.get<ApiResponse<Ride[]>>(
            `${API_BASE_URL}/Rides/points`,
            { params: { currentTime } }
        );
        return response;
    }
};

export default apiService;
