const availableActions =  [
    'create_course',
    'delete_course',
    'add_lesson',
    'delete_lesson',
    'add_assignment',
    'delete_assignment',
    'enroll_student',
    'unenroll_student',
    'add_teacher',
    'remove_teacher'
];

import base_url from '../base_url'

const performCourseManagerAction = async({
    action,
    course_id = null,
    user_id = null,
    item_id = null,
    title = null,
    content = null,
    description = null
  }) => {
    if (!availableActions.includes(action)) {
        console.error(`Invalid action: ${action}`);
        return;
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${base_url}course-manager/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            action,
            course_id,
            user_id,
            item_id,
            title,
            content,
            description
        }),
    });

    if (!response.ok) {
        console.error(`Failed to perform action: ${action}`);
        return;
    }

    const data = await response.json();
    console.log("Successfully performed action: ", action);
    return data;
}

export default performCourseManagerAction;
