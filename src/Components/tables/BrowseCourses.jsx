import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';
import performCourseManagerAction from '../../service/courseManagerActions';


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
            {
                Header: 'Enroll',
                accessor: 'course_id',
                Cell: ({ row }) => (
                    <button onClick={() => performCourseManagerAction({
                        action: 'enroll_student',
                        course_id: row.original.id 
                    })}>
                        Enroll
                    </button>
                ),
            },
        ],
        []
    );

    // Do something diffent here i.e. a sign up button to enroll in a course
    return <BaseTable data={data} columns={columns} rowType='courses'/>
};

export default BrowseCourses;