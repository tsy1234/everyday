import { connect } from 'react-redux';
import GroupList from '../components/GroupList';
import { setGroupPanel, addNewGroup } from '../action';


var mapStateToProps = (state) => {
    console.log('mapState GetGroupList', state.groupsList);
    return {
        groups: state.groupsList,
        panel: state.panel
    };
};

var mapDispatchToProps = (dispatch) => {
    console.log('mapdispatch GetGroupList');
    return {
        openPanel: () => { dispatch(setGroupPanel(true)); },
        closePanel: () => { dispatch(setGroupPanel(false)); },
        addNewGroup: (obj) => { dispatch(addNewGroup(obj)); }
    };
};

var GetGroupList = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupList);

export default GetGroupList;
