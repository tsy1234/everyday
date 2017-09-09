import { combineReducers } from 'redux';
import { 
    REQUEST_GROUPS, RECEIVE_GROUPS,
    GET_MY_ACHIEVES
} from './action';

function groupsList (state = [], action) {
    switch (action.type) {
        case RECEIVE_GROUPS:
            return action.groups;
        default:
            return state;
    }
}

function choosedGroup (state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}

function choosedGroupMember (state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

function myAchieves (state = [], action) {
    switch (action.type) {
        case GET_MY_ACHIEVES:
            return action.myAchieves;

        default:
            return state;
    }
}

function choosedMemberAchieves (state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    groupsList,
    choosedGroup,
    choosedGroupMember,
    myAchieves,
    choosedMemberAchieves
});

export default rootReducer;