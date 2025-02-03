const deleteUser = async ({ user_id }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/users/delete/`, {
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