import Request from "../../../utils/Request";
import auth from '../../account/authToken';

export const GET_USER_DETAILS = Symbol("GET_USER_DETAILS")

export const getUserDetails = (onSuccess, onFailure) => (dispatch) => {
    let data = {
        headers: {
            Authorization: "Token " + auth.getActiveToken(),
        }
    }
    Request(
        'get',
        'account-details',
        data.headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: response.data
                })
            onSuccess()
        },
        onFailure
    );
}