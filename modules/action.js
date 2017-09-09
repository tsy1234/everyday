import axios from 'axios';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const GET_MY_ACHIEVES = 'GET_MY_ACHIEVES';
export const GET_MEMBER_ACHIEVES = 'GET_MEMBER_ACHIEVES';
export const ADD_MY_ACHIEVES = 'ADD_MY_ACHIEVES';

export function requestMain () {
    return (dispatch) => {
        console.log('requsetMain');
        dispatch(requestGroups());    
    };
}

function requestGroups () {
    return function (dispatch) {
        return axios.get('/back/getgroups')
            .then((response) => {
                console.log('requestGroups', response.data);
                dispatch(receiveGroups(response.data));
            });
    };
}

function receiveGroups (groups) {
    return {
        type: RECEIVE_GROUPS,
        groups: groups
    };
}

export function requestMyAchieves () {
    console.log('requestMyAchieves');
    return (dispatch) => {
        return axios.get('/back/getmy')
            .then((response) => {
                dispatch(getMyAchieves(response.data.achieved));
            });
    };
}

function getMyAchieves (myAchieves) {
    return {
        type: GET_MY_ACHIEVES,
        myAchieves: myAchieves
    };
}

// export function requestMemberAchieves () {
//     return (dispatch) => {
//         return 
//     }
// }

// function getMemberAchieves () {

// }

