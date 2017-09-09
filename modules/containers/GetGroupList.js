import { connect } from 'react-redux';
import GroupList from '../components/GroupList';

var matStateToProps = (state) => {
    console.log('mapStateToProps', state.groupsList);
    return {
        groups: state.groupsList
    };
};

var GetGroupList = connect(matStateToProps)(GroupList);

export default GetGroupList;
