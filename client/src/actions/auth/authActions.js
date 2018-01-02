import {AUTH_USER, AUTH_ERROR, UNAUTH_USER} from './authActionTypes';
import {SERVER_URL} from './../../config';

export const signInUser = ({email, password}) => {
    return function(dispatch) {
        fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({email: email, password:password})})
            .then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    return response.json();
                } else {
                    dispatch(authError);
                }})
            .then (data => {
                localStorage.setItem('token', data.access_token);
                dispatch({type: AUTH_USER, username: data.username});
            })
            .catch(error => {
                dispatch(authError);
            });
    };
};


export const signOutUser = () => {
    return function (dispatch) {
        localStorage.removeItem('token');
        dispatch({type: UNAUTH_USER});
    }
};

export function authError(errorMsg) {
    return {type: AUTH_ERROR, action: errorMsg};
}
