const handleGetRowItem = async (row, rowType) => {
    const token = localStorage.getItem('token');
    let id = 0;
    if (['students', 'teachers', 'admins', 'users'].includes(rowType)) {
        id = row.user_id;
    } else {
        id = row.id;
    }
    if (id === 0) {
        throw { status: 400, message: "ID not found" };
    }

    const response = await fetch(`http://localhost:8000/${rowType}/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();  
        throw { status: response.status, message: errorData.detail || "An error occurred" };
    }

    return response.json();
}

const HandleGetObjects = async (req, res) => {

}

export {handleGetRowItem, HandleGetObjects};