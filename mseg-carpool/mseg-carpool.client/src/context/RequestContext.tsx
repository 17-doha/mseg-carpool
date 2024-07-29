import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getRequestsForDriver } from '../services/requestService';

const STORAGE_KEY = "requests";

interface Request {
    id: number;
    status: string;
    pickupPoints: string;
    usersId: string;
    rideId: number;
    users: {
        id: string;
        name: string;
        email: string;
        mobileNumber: string;
        location: string;
        carType: string;
        carModel: string;
        carPlate: string;
        carColor: string;
        points: number;
    };
    ride: {
        id: number;
        origin: string;
        destination: string;
        availableSeats: number;
        departureTime: string;
        coordinates: string;
        usersId: string;
    };
}

interface RequestState {
    requests: Request[];
}

type Action =
    | { type: 'ADD_REQUEST'; payload: Request }
    | { type: 'LOAD_REQUESTS'; payload: Request[] }
    | { type: 'REMOVE_REQUEST'; payload: number };

const initialState: RequestState = {
    requests: [],
};

const RequestContext = createContext<{
    state: RequestState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

const requestReducer = (state: RequestState, action: Action): RequestState => {
    switch (action.type) {
        case 'ADD_REQUEST':
            return {
                ...state,
                requests: [...state.requests, action.payload],
            };
        case 'LOAD_REQUESTS':
            return {
                ...state,
                requests: action.payload,
            };
        case 'REMOVE_REQUEST':
            return {
                ...state,
                requests: state.requests.filter(req => req.id !== action.payload),
            };
        default:
            return state;
    }
};
// working code
//export const RequestProvider: React.FC = ({ children }) => {
//    const [state, dispatch] = useReducer(requestReducer, initialState);
//    const { instance, accounts } = useMsal();

//    useEffect(() => {
//        const fetchRequests = async () => {
//            try {
//                const account = accounts[0];
//                const userAzureId = account?.username; // Assuming Azure ID is in the username field
//                const fetchedRequests = await getRequestsForDriver(userAzureId);
//                console.log('Fetched requests:', fetchedRequests);

//                const requestsArray = fetchedRequests.$values || [];

//                dispatch({ type: 'LOAD_REQUESTS', payload: requestsArray });
//            } catch (error) {
//                console.error('Error fetching requests', error);
//            }
//        };

//Testing with user1 from local DB
export const RequestProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(requestReducer, initialState);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const fetchedRequests = await getRequestsForDriver('user3');
                console.log('Fetched requests:', fetchedRequests);  // Log the fetched requests
                if (fetchedRequests.$values) {
                    dispatch({ type: 'LOAD_REQUESTS', payload: fetchedRequests.$values });
                } else {
                    dispatch({ type: 'LOAD_REQUESTS', payload: fetchedRequests });
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.requests));
    }, [state.requests]);

    return (
        <RequestContext.Provider value={{ state, dispatch }}>
            {children}
        </RequestContext.Provider>
    );
};

export const useRequestContext = () => useContext(RequestContext);
