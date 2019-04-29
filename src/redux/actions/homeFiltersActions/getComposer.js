
import Request from "../../../utils/Request";

export const GET_COMPOSER = Symbol("GET_COMPOSER")

export const getComposer = (lang, onSuccess, onFailure) => (dispatch) => {
      Request(
        'get',
        'composer-read',
        {},
        {lang},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_COMPOSER,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure
      )
}