import React, { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = "requests";

interface Request {
    id: number;
    from: string;
    message: string;
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

export const RequestProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(requestReducer, initialState);

    useEffect(() => {
        const savedRequests = localStorage.getItem(STORAGE_KEY);
        if (savedRequests) {
            dispatch({ type: 'LOAD_REQUESTS', payload: JSON.parse(savedRequests) });
        }
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
