
import Request from "../../../utils/Request";

export const GET_EDITION = Symbol("GET_EDITION")

export const getEdition = (lang, onSuccess, onFailure) => (dispatch) => {
    Request(
        'get',
        'edition-read',
        {},
        {lang},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_EDITION,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure
    )
}