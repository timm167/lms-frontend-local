const courseFilter = (rows, id, filterValue) => {
    console.log("courseFilter");
    console.log(rows);

    return rows.filter(row => {
        const course = row.original.course;
        const courseTitle = course ? course.title.toLowerCase() : '';
        return courseTitle.includes(filterValue.toLowerCase());
    });
};

const studentFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const student = row.original.student;
        const studentName = student ? student.full_name.toLowerCase() : '';
        return studentName.includes(filterValue.toLowerCase());
    });
};

const completionStatusFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const completed = row.original.completed;
        const status = completed ? 'completed' : 'in progress';
        return status.includes(filterValue.toLowerCase());
    });
};

export { courseFilter, studentFilter, completionStatusFilter };