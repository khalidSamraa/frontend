import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const MAKE_CARD_PRIMARY = Symbol("MAKE_CARD_PRIMARY");

export const makeCardPrimary = (pid, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    const formData = new FormData();
    formData.append('pid', pid);
    Request(
        "put",
        "set-primary-payment",
        headers,
        formData,
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: MAKE_CARD_PRIMARY,
                    payload: response
                })
            onSuccess()
        },
        onFailure,
    )
}
