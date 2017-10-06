import { connect } from 'react-redux';
import Group from '../components/Group';
import { delGroup } from '../action';

var mapDispatchToProps = (dispatch) => {
    return {
        delGroup: (groupName) => { dispatch(delGroup(groupName)); }
    };
};

var GetGroup = connect(
    null,
    mapDispatchToProps
)(Group);

export default GetGroup;