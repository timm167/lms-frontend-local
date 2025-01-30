import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';

const BrowseCourses = ({ data}) => {

    const columns = useMemo(
        () => [
            {
                Header: 'Course Name',
                accessor: 'title',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Teacher',
                accessor: 'teacher_name',
            },
        ],
        []
    );

    return <BaseTable data={data} columns={columns}/>
};

export default BrowseCourses;