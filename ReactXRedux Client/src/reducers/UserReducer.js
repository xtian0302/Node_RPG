import {FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../actions/UserActions';

const initialState = {
    pending: false,
    list: [],
    error: null
}

export function UserReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                list: action.list
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case 'UPDATE-INDEX':
            return { 
                ...state,
                currentIndex: action.payload 
            }
        default: 
            return state;
    }
}

export const getUsers = state => state.list;
export const getUsersPending = state => state.pending;
export const getUsersError = state => state.error;
export default UserReducer