import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from '../store/actions/actions';

export const useTypeAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
};
