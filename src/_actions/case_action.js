import axios from 'axios';
import {
    FILTER_CASES,
    FETCH_CASES,
    FETCH_ELEMENTS
} from './types';


export function filterCases(dataToSubmit){
    const request = axios.get(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}
