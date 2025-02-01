import React, { useMemo } from 'react';
import {BaseTable, ExpandableList} from './BaseTable';
import {listContainsCourseFilter} from './filters/listContainsFilters';

const TeachersTable = ({ data }) => {
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
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Courses',
            accessor: 'teaching_courses',
            filter: listContainsCourseFilter,
            Cell: ({ row }) => (
                <ExpandableList data={row.original.teaching_courses} label="Courses" itemKey="course_id" itemLabel="title" />
            ),
        }
    ], []);

    return <BaseTable data={data} columns={columns} rowType='users' />;
};

export default TeachersTable;
