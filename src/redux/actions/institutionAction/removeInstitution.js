import Request from "../../../utils/Request";

export const removeInstitution = (headers, onSuccess, onFailure) => () => {
      Request(
        "delete",
        "institution-remove",
        headers,
        {},
        [],
        onSuccess,
        onFailure
      )
}
