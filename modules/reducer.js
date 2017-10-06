import { combineReducers } from 'redux';
import { 
    REQUEST_GROUPS, RECEIVE_GROUPS,
    GET_MY_ACHIEVES, SET_GROUP_PANEL,
    ADD_MY_ACHIEVES, DEL_GROUP,
    ADD_NEW_GROUP, SET_OPEN
} from './action';

function delGroup (state, groupName) {
    const arr = state.slice();
    var index;
    for (var i = 0;i < arr.length;i++) {
        if (arr[i]['name'] == groupName) {
            index = i;
            break;
        }
    }
    arr.splice(index, 1);
    return arr;
}

function groupsList (state = [{name: 'front-paap', introduce: 'meiyou'}], action) {
    switch (action.type) {
        case RECEIVE_GROUPS:
            return action.groups;
        case ADD_NEW_GROUP:
            return [...state, action.newGroup];
        case DEL_GROUP:
            return delGroup(state, action.groupName);
        default:
            return state;
    }
}

function myAchievesOpen (state = false, action) {
    switch (action.type) {
        case SET_OPEN:
            return action.value;
        default:
            return state;
    }
}

function panel (state = false, action) {
    switch (action.type) {
        case SET_GROUP_PANEL:
            return action.value;
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
        case ADD_MY_ACHIEVES:
            return [...state, action.newAchieve];
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
    myAchievesOpen,
    groupsList,
    panel,
    choosedGroup,
    choosedGroupMember,
    myAchieves,
    choosedMemberAchieves
});

export default rootReducer;