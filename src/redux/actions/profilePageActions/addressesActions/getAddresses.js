
import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const GET_ADDRESSES = Symbol("GET_ADDRESSES")

export const getAddresses = (onSuccess, onFailure) => (dispatch) => {
    let headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }
   
    Request(
        "get",
        "get-addresses",
        headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_ADDRESSES,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure,
        undefined,
        undefined,
        `?search=`
    )
}