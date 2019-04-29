
import Request from "../../../../utils/Request";
import auth from '../../../account/authToken';

export const GET_ORDERS_HISTORY = Symbol("GET_ORDERS_HISTORY")

export const getOrdersHistory = (data, onSuccess, onFailure) => (dispatch) => {
    const headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }

    Request(
        "get",
        "purchase-read",
        headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: GET_ORDERS_HISTORY,
                    payload: response.data.results || []
                })
                onSuccess && onSuccess()
        },
        onFailure,
        undefined,
        undefined,
        `${data.start_date? `?start_date=${data.start_date}` : ''}${data.end_date? `&end_date=${data.end_date}` : ''}${data.active === 1? `&active=${1}` : data.active === 2 ? `&active=${0}` : ''}`
    )
}