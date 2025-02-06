import React from 'react';
import { useAppContext } from '../../AppContext';
import CourseView from './CourseView';
import LessonView from './LessonView';
import AssignmentView from './AssignmentView';

export default function ObjectViewer() {
    const { viewType } = useAppContext();
    if (viewType === 'courses') {
        return <CourseView />;
    }
    if (viewType === 'lessons') {
        console.log('lessons');
        return <LessonView />;
    }
    if (viewType === 'assignments') {
        return <AssignmentView />;

    }
}