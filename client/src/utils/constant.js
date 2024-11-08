export const HOST = import.meta.env.VITE_SERVER_URL;

export const Auth_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${Auth_ROUTES}/signup`;
export const LOGIN_ROUTE = `${Auth_ROUTES}/login`;
export const GET_USER_INFO = `${Auth_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${Auth_ROUTES}/update-profile`;
export const PROFILE_IMAGE_ROUTE = `${Auth_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${Auth_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${Auth_ROUTES}/logout`;


export const CONTACT_ROUTES = "api/contacts"
export const SEARCH_CONTACT_ROUTES = `${CONTACT_ROUTES}/search`
export const GET_DM_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-contacts-for-dm`
export const GET_ALL_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-all-contacts`


export const MESSAGES_ROUTES = "api/messages"
export const GET_ALL_MESSAGES = `${MESSAGES_ROUTES}/get-messages`
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`

