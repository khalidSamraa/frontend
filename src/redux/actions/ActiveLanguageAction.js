export const CHANGE_LANGUAGE = "changeLanguage"
export const SAVE_LANGUAGE = "saveLanguage"

export function changeLanguage(lang) {
  return {
    type: CHANGE_LANGUAGE,
    payload: {lang}
  }
}

export function saveLanguage(content) {
  return {
    type: SAVE_LANGUAGE,
    payload: {content: content}
  }
}
