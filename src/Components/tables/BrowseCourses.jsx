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

    // Do something diffent here i.e. a sign up button to enroll in a course
    return <BaseTable data={data} columns={columns} rowType='courses'/>
};

export default BrowseCourses;