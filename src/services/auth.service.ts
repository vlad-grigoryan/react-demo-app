import jwtDecode from 'jwt-decode';
import { logoutUser } from '../redux/actions/auth.actions'
import store from '../redux/stores';
import moment from 'moment';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../redux/types';
import {user} from '../config';
import {UserDataModel} from '../models/Login.model';
import * as jwt from 'jsonwebtoken';

export const CheckAuthentication = () => {
    const authToken: string = localStorage.token;
    if (authToken) {
        const decodedToken :any = jwtDecode(authToken);
        // Check if token expired
        //TODO: remove moment its to big 300kb use Date object
        //TODO: validate authtoken should be real backend for checking
        if (moment(decodedToken.time).diff(moment(), 'minutes') <= 0) {
            store.dispatch(logoutUser());
        } else {
            store.dispatch({ type: SET_AUTHENTICATED, payload: {token: authToken} });
        }
    } else {
        store.dispatch({ type: SET_UNAUTHENTICATED });
    }
};

export const FakeAuthorization = (userData: UserDataModel) => {
    return new Promise((resolve, reject) => {
        const decodedUserData:UserDataModel = jwtDecode(user);
        // Create auth token with 2 hours expiration
        const encodeToken: string = jwt.sign({time: moment().add(2, 'hours').valueOf()}, 'key');
        // Login with test username test password
        if (decodedUserData.userName === userData.userName && userData.password === decodedUserData.password){
            resolve(encodeToken);
        } else {
            const error: any = new Error('Unauthorized');
            // lIke backend Error
            error.response = {
                data: {
                    description: 'Wrong username or password',
                },
                status: 401
            };
            reject(error)
        }
    })
};
