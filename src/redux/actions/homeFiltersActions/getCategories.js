
import Request from "../../../utils/Request";

export const GET_CATEGORIES = Symbol("GET_CATEGORIES")

export const getCategories = (lang, onSuccess, onFailure) => (dispatch) => {
    Request(
        'get',
        'category-read',
        {},
        {lang},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_CATEGORIES,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure,
      )
}