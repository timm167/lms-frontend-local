import React, { useMemo } from 'react';
import BrowseCourses from './BrowseCoursesTable';
import { ExpandableList, BaseTable, DefaultColumnFilter } from './BaseTable';
import { listContainsNameFilter, listContainsLessonFilter, listContainsAssignmentFilter } from './filters/nestedFilter';
import teacherInCourseFilter from './filters/teacherInCourseFilter';
import performCourseManagerAction from '@actions/courseManagerActions';
import { useAppContext } from '@/AppContext';
import getLists from '@get/getLists';

const CoursesTable = ({ data}) => {
    const { setTableData, tableView } = useAppContext();

    const handleDelete = async (course_id) => {
        await performCourseManagerAction({action: 'delete_course', course_id: course_id})
        const newTableData = await getLists('courses',tableView);
        setTableData(newTableData);
    }
    
    const columns = useMemo(
        () => [
            {
                Header: 'Course ID',
                accessor: 'id',
            },
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
                accessor: 'teacher',
                filter: teacherInCourseFilter,
                Cell: ({ row }) => {
                    const teacher = row.original.teacher;
                    return teacher ? teacher.full_name : 'No teacher assigned';
                },
            },
            {
                Header: 'Students',
                accessor: 'students',
                filter: listContainsNameFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.students} label="Students" itemKey="user_id" itemLabel="full_name" />
                ),
            },
            {
                Header: 'Lessons',
                accessor: 'lessons',
                filter: listContainsLessonFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.lessons} label="Lessons" itemKey="lesson_id" itemLabel="title" />
                ),
            },
            {
                Header: 'Assignments',
                accessor: 'assignments',
                filter: listContainsAssignmentFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.assignments} label="Assignments" itemKey="assignment_id" itemLabel="title" />
                ),
            },
            {
                Header: 'Delete Course',
                Filter: false,
                Cell: ({ row }) => (
                    <button onClick={() => handleDelete(row.original.id)}>Delete</button>
                )
            }
        ],
        [handleDelete, tableView]
    );
    if (tableView === 'browse') {
        return (
            <BrowseCourses data={data} />
        );
    }

    return <BaseTable data={data} columns={columns} rowType='courses'/>
};



export default CoursesTable;
