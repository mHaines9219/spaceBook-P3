// Use sendRequest to handle fetch
import sendRequest from './send-request';

const BASE_URL = '/api/profiles';

// Retrieve user's profile (controller accesses user via req)
export function getProfile(user) {
    return sendRequest(`${BASE_URL}/${user._id}`)
}

export function update(user) {
    return sendRequest(`${BASE_URL}/${user._id}`, 'PUT')
}

export function deleteProfile(user) {
    return sendRequest(`${BASE_URL}/${user._id}`, 'DELETE')
}

export function getAll() {
    return sendRequest(BASE_URL)
}

export function createProfile(user) {
    return sendRequest(`${BASE_URL}/${user._id}`, 'POST');
}