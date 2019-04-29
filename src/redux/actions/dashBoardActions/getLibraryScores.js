
import Request from "../../../utils/Request";
import auth from '../../account/authToken';

export const GET_LIBRARY_SCORES = Symbol("GET_LIBRARY_SCORES")

export const getLibraryScores = (payloads, onSuccess, onFailure) => (dispatch) => {
    let headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }
   
    Request(
        'get',
        'library-read',
        headers,
        payloads,
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_LIBRARY_SCORES,
                    payload: response.data.results || []
                })
            onSuccess && onSuccess()
        },
        onFailure,
        undefined,
        undefined
      );
}