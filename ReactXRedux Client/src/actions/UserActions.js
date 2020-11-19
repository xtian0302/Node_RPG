export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

 
export function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersPending());
        fetch('http://localhost:6969/api/rpg_user/')
        .then(res => res.json())
        .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchUsersSuccess(res));
                return res;
        })
        .catch(error => {
            dispatch(fetchUsersError(error));
        })
    }
}  
export function deleteUser(user_id) {
    return async dispatch => {
        dispatch(fetchUsersPending());
        await fetch('http://localhost:6969/api/rpg_user/'+user_id, {
            method: 'DELETE'
        }) 
    }
}   
export const updateIndex = index => {
    return {
        type: 'UPDATE-INDEX',
        payload: index
    }

}

export function fetchUsersPending() {
    return {
        type: FETCH_USERS_PENDING
    }
} 
export function fetchUsersSuccess(list) {
    return {
        type: FETCH_USERS_SUCCESS,
        list: list
    }
} 
export function fetchUsersError(error) {
    return {
        type: FETCH_USERS_ERROR,
        error: error
    }
} 