
import Request from "../../../utils/Request";

export const GET_INSTRUMENT = Symbol("GET_INSTRUMENT")

export const getInstrument = (lang, onSuccess, onFailure) => (dispatch) => {
    Request(
        'get',
        'instrument-read',
        {},
        {lang},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_INSTRUMENT,
                    payload: response.data.results || []
                })
            onSuccess()
        },
        onFailure
    )
}