import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';

const UsersTable = ({ data }) => {
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
    ], []);

    return <BaseTable data={data} columns={columns} rowType='users'/>;
};

export default UsersTable;
