import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const DELETE_ADDRESS = Symbol("DELETE_ADDRESS");

export const deleteAddress = (id, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    Request(
        "delete",
        "delete-address",
        headers,
        {},
        [id],
        (response) => {
            response && response.data &&
                dispatch({
                    type: DELETE_ADDRESS,
                    payload: response
                })
            onSuccess()
        },
        onFailure,
    )
}
