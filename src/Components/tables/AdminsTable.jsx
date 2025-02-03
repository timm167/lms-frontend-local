import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';

const AdminTable = ({ data }) => {
    const columns = useMemo(
        () => [
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
                Header: 'Email',
                accessor: 'email',
            },
        ],
        []
    );

    return <BaseTable data={data} columns={columns} rowType='users'/>
};

export default AdminTable;
