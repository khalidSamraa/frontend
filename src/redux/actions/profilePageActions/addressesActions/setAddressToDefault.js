import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const SET_ADDRESS_TO_DEFAULT = Symbol("SET_ADDRESS_TO_DEFAULT");

export const setAddressToDefault = (id, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    Request(
        "post",
        "set-default-address",
        headers,
        {},
        [id],
        (response) => {
            response && response.data &&
                dispatch({
                    type: SET_ADDRESS_TO_DEFAULT,
                    payload: response
                })
            onSuccess()
        },
        onFailure,
    )
}
