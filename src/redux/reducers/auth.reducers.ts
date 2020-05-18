import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
} from '../types';


const initialState = {
    authenticated: null,
    loading: false
};

export default function (state: {authenticated: boolean | null, loading: boolean} = initialState, action: any) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false,
            };
        default:
            return state;
    }
}
