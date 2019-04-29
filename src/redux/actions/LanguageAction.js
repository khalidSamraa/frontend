export const LANGUAGE_LOADED = "languageLoaded"

export function languageLoaded(payload) {
  return {
    type: LANGUAGE_LOADED,
    payload: payload
  }
}
