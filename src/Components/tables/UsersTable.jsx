import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';
import deleteUser from '@actions/deleteUser'
import { useAppContext } from '../../AppContext';
import getLists from '@get/getLists';

const UsersTable = ({ data }) => {
    const { setTableData, tableView } = useAppContext();
    
    const handleDeleteClick = async(user_id) => {
        await deleteUser({user_id: user_id})
        const newTableData = await getLists('users',tableView);
        setTableData(newTableData);
    }
    const columns = useMemo(() => [
        {
            Header: 'User ID',
            accessor: 'user_id',
        },
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
        {
            Header: 'Delete User',
            Filter: false,
            Cell: ({ row }) => (
                <button onClick={() => handleDeleteClick(row.original.user_id)}>Delete</button>
            )
        }
    ], []);

    return <BaseTable data={data} columns={columns} rowType='users'/>;
};

export default UsersTable;
