import axios from 'axios';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const GET_MY_ACHIEVES = 'GET_MY_ACHIEVES';
export const GET_MEMBER_ACHIEVES = 'GET_MEMBER_ACHIEVES';
export const ADD_MY_ACHIEVES = 'ADD_MY_ACHIEVES';
export const SET_GROUP_PANEL = 'SET_GROUP_PANEL';
export const ADD_NEW_GROUP = 'ADD_NEW_GROUP';
export const SET_OPEN = 'SET_OPEN';
export const DEL_GROUP = 'DEL_GROUP';

export function requestMain () {
    return (dispatch) => {
        console.log('request groups');
        dispatch(requestGroups());    
    };
}

function requestGroups () {
    return function (dispatch) {
        return axios.get('/back/getgroups')
            .then((response) => {
                console.log('requestGroupsover', response.data);
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

export function setOpen (value) {
    return {
        type: SET_OPEN,
        value: value
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

export function addAchieve (obj) {
    return {
        type: ADD_MY_ACHIEVES,
        newAchieve: obj
    };
}

export function addNewGroup (obj) {
    return {
        type: ADD_NEW_GROUP,
        newGroup: obj
    };
}

export function setGroupPanel (value) {
    return {
        type: SET_GROUP_PANEL,
        value: value
    };
}

function getMyAchieves (myAchieves) {
    return {
        type: GET_MY_ACHIEVES,
        myAchieves: myAchieves
    };
}

export function delGroup (groupName) {
    return {
        type: DEL_GROUP,
        groupName: groupName
    };
}

