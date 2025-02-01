const teacherInCourseFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const teacher = row.original.teacher;
        const teacherName = teacher ? teacher.full_name.toLowerCase() : '';
        return teacherName.includes(filterValue.toLowerCase());
    });
};

export default teacherInCourseFilter;