import Request from "../../utils/Request";
import auth from '../account/authToken';

export const createInvitation = (data, onSuccess, onFailure) => () => {
    let headers = {
        Authorization: "Token " + auth.getActiveToken(),
    }
    Request(
        "post",
        "create-invitation",
        headers,
        data,
        [],
        onSuccess,
        onFailure,
    )
}
