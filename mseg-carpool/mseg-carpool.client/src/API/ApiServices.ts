import axios from 'axios';

// Configure the Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5062/api/', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ride DTO interface
interface RideDto {
    id?: number;
    origin: string;
    destination: string;
    availableSeats: number;
    departureTime: string;
    coordinates: string;
    userId?: string;
}

// User DTO interface
interface UserDto {
    name: string;
    mobileNumber: string;
    location: string;
}

// Car DTO interface
interface CarDto {
    carType: string;
    carPlate: string;
    carColor: string;
    carModel: string;
}

// API methods
const createRide = async (rideDto: RideDto) => {
    try {
        const response = await api.post('/Rides', rideDto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const updateUserDetails = async (azureId: string, updatedUserDto: UserDto) => {
    try {
        const response = await api.put(`/Users/User/${azureId}`, updatedUserDto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const updateCarDetails = async (azureId: string, updatedCarDto: CarDto) => {
    try {
        const response = await api.put(`/Users/Car/${azureId}`, updatedCarDto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getCarDetails = async (azureId: string) => {
    try {
        const response = await api.get(`/Users/${azureId}/car-details`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
        // Check for specific status codes or error messages
        if (error.response.status === 400) {
            throw new Error('Bad Request: ' + JSON.stringify(error.response.data));
        } else if (error.response.status === 404) {
            throw new Error('Not Found: ' + JSON.stringify(error.response.data));
        } else if (error.response.status === 500) {
            throw new Error('Internal Server Error: ' + JSON.stringify(error.response.data));
        } else {
            throw new Error(`An error occurred: ${error.response.status} - ${error.response.statusText}`);
        }
    } else {
        // If there's no response, it might be a network error or something else
        throw new Error('An error occurred while making the request.');
    }
};

// Export the API methods
export default {
    createRide,
    updateUserDetails,
    updateCarDetails,
    getCarDetails,
};
