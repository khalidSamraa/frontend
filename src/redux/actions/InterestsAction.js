import Request from "../../utils/Request";
import auth from './../../redux/account/authToken';

export const INTERESTS_LOADED = Symbol("INTERESTS_LOADED")

export const loadInterests = (auth, onSuccess, onFailure) => (dispatch) => {
    let data = {
        headers: {
            Authorization: "Token " + auth.getActiveToken(),
        }
    }

    Request(
        "get",
        "interests",
        data.headers,
        {},
        [],
        (response) => {
            response && response.data &&
                dispatch({
                    type: INTERESTS_LOADED,
                    payload: response.data.interests
                })
            onSuccess()
        },
        onFailure,
    )
}

export const updateInterests = (userId, groupId, interests, onSuccess, onFailure) => (dispatch) => {
    let data = {
        headers: {
            Authorization: "Token " + auth.getActiveToken(),
        }
    }

    let payload = {
        authority_auids: interests.map(item => item.id),
        user_uid: userId,
        group_gid: groupId
    };

    Request(
        "post",
        "update-interests",
        data.headers,
        payload,
        [],
        onSuccess,
        onFailure,
    )
}
