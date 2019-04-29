
import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const GET_CARDS = Symbol("GET_CARDS")

export const getCards = (onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }
    
    Request(
        "get",
        "read-payment-method",
        headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_CARDS,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure,
    )

}