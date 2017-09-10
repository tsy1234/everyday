import Nav from '../components/Nav';
import { connect } from 'react-redux';
import { requestMyAchieves, setOpen } from '../action';


const mapStateToProps = (state) => {
    return {
        myAchieves: state.myAchieves,
        open: state.myAchievesOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyAchieves: () => { dispatch(requestMyAchieves()); },
        setOpen: (value) => { dispatch(setOpen(value));}
    };
};

const GetNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default GetNav;
