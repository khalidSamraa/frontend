
import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const GET_CONTACTS = Symbol("GET_CONTACTS")

export const getContacts = (onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }
   
    Request(
        "get",
        "account-contacts",
        headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_CONTACTS,
                    payload: response.data.results || []
                })
                onSuccess && onSuccess()
        },
        onFailure,
    )
}