import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const DELETE_CRAD = Symbol("DELETE_CRAD");

export const deleteCard = (pid, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    Request(
        "delete",
        "delete-payment-method",
        headers,
        {},
        [pid],
        (response) => {
            response && response.data &&
                dispatch({
                    type: DELETE_CRAD,
                    payload: response
                })
            onSuccess && onSuccess()
        },
        onFailure,
    )
}
