import base_url from '../base_url'

const deleteUser = async ({ user_id }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${base_url}users/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            user_id,
        }),
    });

    if (!response.ok) {
        console.error(`Failed to delete user: ${user_id}`);
        return;
    }

    const data = await response.json();
    return data;
}

export default deleteUser;