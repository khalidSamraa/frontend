import Request from "../../../utils/Request";

export const updateInstitution = (data, onSuccess, onFailure) => () => {
    Request(
        "patch",
        "institution-update",
        data.headers,
        data.payloads,
        [],
        onSuccess,
        onFailure
      )
}
