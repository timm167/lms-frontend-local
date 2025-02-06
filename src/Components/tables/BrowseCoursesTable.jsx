import React, { useMemo } from 'react';
import { BaseTable } from '@tables/BaseTable';
import performCourseManagerAction from '@actions/courseManagerActions';
import { useAppContext } from '../../AppContext';

const BrowseCourses = ({ data}) => {
    const { setSwitchTable } = useAppContext();

    const handleClick = async (row) => {
        await performCourseManagerAction({
            action: 'enroll_student',
            course_id: row.original.id 
        })
        setSwitchTable('myCourses');
    }

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
                    <button onClick={() => handleClick(row)} className='enroll-button'>
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