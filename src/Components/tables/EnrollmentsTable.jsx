import React, { useMemo } from 'react';
import { DefaultColumnFilter, BaseTable } from '@tables/BaseTable';
import { courseFilter, studentFilter, completionStatusFilter } from '@tables/filters/enrollmentsFilters';
import performCourseManagerAction from '@/service/actions/courseManagerActions';
import { useAppContext } from '@/AppContext';
import getLists from '@/service/get/getLists';

const EnrollmentsTable = ({ data }) => {
    const {setTableData, tableView } = useAppContext();

    const handleUnenrollClick = async(row) => {
        await performCourseManagerAction({
          action: 'unenroll_student',
          course_id: row.original.course.id,
          user_id: row.original.student.user_id
        });
        const newTableData = await getLists('enrollments',tableView);
        setTableData(newTableData);
    };  

  
    const columns = useMemo(
        () => [
            {
                Header: 'Course',
                accessor: 'course',
                Cell: ({ value }) => value.title,
                Filter: DefaultColumnFilter,
                filter: courseFilter,
            },
            {
                Header: 'Student',
                accessor: 'student',
                Cell: ({ value }) => value.full_name,
                Filter: DefaultColumnFilter,
                filter: studentFilter,
            },
            {
                Header: 'Date Enrolled',
                accessor: 'enrollment_date',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Completion Status',
                accessor: 'completed',
                Filter: DefaultColumnFilter,
                filter: completionStatusFilter,
                Cell: ({ value }) => (value ? 'Completed' : 'In Progress'),
            },
            {
                Header: 'Unenroll student',
                accessor: 'course_id',
                Filter: DefaultColumnFilter,
                Cell: ({ row }) => {
                    return (
                        <button onClick={() => handleUnenrollClick(row)} className='unenroll-button'>
                            Unenroll
                        </button>
                    );
                },
            }
        ],
        []
    );

    return <BaseTable data={data} columns={columns} rowType='enrollments'/>
}

export default EnrollmentsTable;
