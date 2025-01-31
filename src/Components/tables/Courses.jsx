import React, { useMemo } from 'react';
import BrowseCourses from './BrowseCourses';
import {ExpandableList, BaseTable} from './BaseTable';

const CoursesTable = ({ data, tableView }) => {
    if (tableView === 'browse') {
        return (
            <BrowseCourses data={data} />
        );
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
                Cell: ({ row }) => {
                    const teacher = row.original.teacher;
                    return teacher ? teacher.full_name : 'No teacher assigned';
                },
            },
            {
                Header: 'Students',
                accessor: 'students',
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.students} label="Students" itemKey="user_id" itemLabel="full_name" />
                ),
            },
            {
                Header: 'Lessons',
                accessor: 'lessons',
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.lessons} label="Lessons" itemKey="lesson_id" itemLabel="title" />
                ),
            },
            {
                Header: 'Assignments',
                accessor: 'assignments',
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.assignments} label="Assignments" itemKey="assignment_id" itemLabel="title" />
                ),
            },
        ],
        []
    );

    return <BaseTable data={data} columns={columns} rowType='courses'/>
};



export default CoursesTable;
