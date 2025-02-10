import base_url from '../base_url'

const getLists = async (type, action='normal') => {
    if (action == 'browse' && type == 'courses') {
        type = type + '/browse'
    }
    const token = localStorage.getItem('token');

    const response = await fetch(`${base_url}${type}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();  // Extract error details from response
        throw { status: response.status, message: errorData.detail || "An error occurred" };
    }

    return response.json();
};

export default getLists;