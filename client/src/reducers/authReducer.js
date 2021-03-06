import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER
} from './../actions/auth/authActionTypes';
import initialState from './initialState';


export default function auth(
    auth=initialState.auth, action={}) {
    switch(action.type) {
        case AUTH_ERROR:
            return Object.assign({},
                {...auth, authenticated: false, username: ''});
        case AUTH_USER:
            return Object.assign({},
                {...auth, authenticated: true,username: action.username});
        case UNAUTH_USER:
            return Object.assign({},
                {...auth, authenticated: false, username: ''});
        default:
            return auth;
    }
}
