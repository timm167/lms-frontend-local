import base_url from '../base_url'

export default function getUserType(token) {
    return fetch(`${base_url}user/type/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to get user type');
            return;
        }
        return response.json();
    })
    .then(data => {
        return data.user_type; 
    });
}