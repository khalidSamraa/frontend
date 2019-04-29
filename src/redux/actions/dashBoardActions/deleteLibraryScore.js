import Request from "../../../utils/Request";
import auth from '../../account/authToken';

export const DELETE_LIBRARY_SCORE = Symbol("DELETE_LIBRARY_SCORE");

export const deleteLibraryScore = (data, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    Request(
        'patch',
        'purchase-unassign',
        headers,
        {},
        [data.assigment],
        (response) => {
            response &&
                dispatch({
                    type: DELETE_LIBRARY_SCORE,
                    payload: response
                })
            onSuccess && onSuccess()
        },
        onFailure,
        data
      );
}
