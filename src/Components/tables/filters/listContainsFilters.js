const listContainsNameFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const list = row.original[id];
        if (!list || !Array.isArray(list)) return false;
        return list.some(item => item.full_name.toLowerCase().includes(filterValue.toLowerCase()));
    });
};

const listContainsLessonFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const list = row.original.lessons;
        if (!list || !Array.isArray(list)) return false;
        return list.some(item => item.title.toLowerCase().includes(filterValue.toLowerCase()));
    });
};

const listContainsAssignmentFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const list = row.original.assignments;
        if (!list || !Array.isArray(list)) return false;
        return list.some(item => item.title.toLowerCase().includes(filterValue.toLowerCase()));
    });
};

const listContainsCourseFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const list = row.original.teaching_courses || row.original.enrolled_courses;
        if (!list || !Array.isArray(list)) return false;
        return list.some(item => item.title.toLowerCase().includes(filterValue.toLowerCase()));
    });
};



export { listContainsNameFilter, listContainsLessonFilter, listContainsAssignmentFilter, listContainsCourseFilter };