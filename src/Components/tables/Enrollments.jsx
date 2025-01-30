import React, { useMemo } from 'react';
import { BaseTable } from './BaseTable';

const EnrollmentsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Enrollment ID',
        accessor: 'id',
      },
      {
        Header: 'Course',
        accessor: 'course',
        Cell: ({ value }) => value.title, // Assuming course is an object with a title property
      },
      {
        Header: 'Student',
        accessor: 'student',
        Cell: ({ value }) => value.full_name, // Assuming student is an object with a full_name property
      },
      {
        Header: 'Date Enrolled',
        accessor: 'enrollment_date',
      },
      {
        Header: 'Completion Status',
        accessor: 'completed',
        Cell: ({ value }) => (value ? 'Completed' : 'In Progress'), // Assuming completed is a boolean
      },
    ],
    []
  );

  return <BaseTable data={data} columns={columns}/>
};

export default EnrollmentsTable;
