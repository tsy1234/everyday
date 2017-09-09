import Nav from '../components/Nav';
import { connect } from 'react-redux';
import { requestMyAchieves } from '../action';


const mapStateToProps = (state) => {
    return {
        myAchieves: state.myAchieves
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyAchieves: () => { dispatch(requestMyAchieves()); }
    };
};

const GetNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default GetNav;
