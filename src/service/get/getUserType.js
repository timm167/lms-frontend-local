export default function getUserType(token) {
    return fetch(`http://localhost:8000/user/type/`, {
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
        return data.user_type; // Return the actual user type
    });
}