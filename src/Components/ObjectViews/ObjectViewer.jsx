import React from 'react';
import { useAppContext } from '../../AppContext';
import CourseView from './CourseView';

export default function ObjectViewer() {
    const { viewType } = useAppContext();
    if (viewType === 'courses') {
        return <CourseView />;
    }
}