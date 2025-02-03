import React, { useMemo } from 'react';
import { BaseTable } from '@tables/BaseTable';
import performCourseManagerAction from '@actions/courseManagerActions';


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
                    })} className='enroll-button'>
                        Enroll
                    </button>
                ),
            },
        ],
        []
    );

    return <BaseTable data={data} columns={columns} rowType='courses'/>
};

export default BrowseCourses;